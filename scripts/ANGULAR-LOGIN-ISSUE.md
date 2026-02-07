# Angular Login Page Screenshot Issue

## Issue Discovery

The Angular login page at `http://localhost:4200/login` was difficult to capture in screenshots because it **automatically redirects** to IdentityServer immediately when the component loads.

## Root Cause

**File:** `Clients/TalentManagement-Angular-Material/talent-management/src/app/routes/sessions/login/login.ts`

**Line 47-50:**
```typescript
ngOnInit() {
  // Automatically redirect to IdentityServer login when this page loads
  this.login();
}
```

**Line 64-67:**
```typescript
login() {
  // Redirect to Duende IdentityServer for OIDC login
  this.oidcAuth.login();
}
```

The `login()` method calls `this.oidcAuth.login()` which triggers the OAuth 2.0 / OIDC authorization code flow, immediately redirecting the browser to:

```
https://localhost:44310/connect/authorize?client_id=TalentManagement&...
```

## What the Login Page Should Show

The Angular login page (`/login`) displays a Material Design card with:

**Title:** "Welcome to Talent Management"

**Content:**
- Description: "Please sign in to manage employee data and access all features."
- **Primary Button:** "Sign In with Identity Server" (mat-raised-button, color="primary")
- **Divider:** "OR"
- **Secondary Button:** "Continue as Guest (View Only)" (mat-stroked-button)
- **Role Information:**
  - Employee: View own profile
  - Manager: View team members
  - HRAdmin: Full CRUD operations

## Authentication Flow

The intended user flow is:

1. **User visits:** `http://localhost:4200`
2. **Auth Guard redirects to:** `http://localhost:4200/login`
3. **Login component loads** and immediately calls `ngOnInit()`
4. **ngOnInit() calls:** `this.oidcAuth.login()`
5. **Browser redirects to:** `https://localhost:44310/connect/authorize?...`
6. **User authenticates** on IdentityServer
7. **IdentityServer redirects to:** `http://localhost:4200/callback?code=...`
8. **Callback component** processes the authorization code and exchanges for tokens
9. **User redirected to:** `http://localhost:4200/dashboard`

## Screenshot Challenge

The auto-redirect happens in **ngOnInit()**, which runs immediately after the component is initialized. This gives only a **very brief window** (typically <100ms) to capture the rendered login page before the OAuth redirect occurs.

Traditional screenshot approaches fail because:
- `waitUntil: 'networkidle'` waits too long, redirect already happened
- `waitUntil: 'domcontentloaded'` still may be too slow
- Angular's component initialization and rendering takes time

## Solutions Implemented

### Solution 1: Quick Capture (take-all-screenshots.js)
```javascript
await page.goto('http://localhost:4200/login', {
  waitUntil: 'domcontentloaded',
  timeout: 10000
});

await page.waitForSelector('mat-card-title', { timeout: 2000 });

await page.screenshot({
  path: path.join(imagesDir, 'angular-login-page.png'),
  fullPage: false,
});
```

Navigates directly to `/login` and captures as quickly as possible after the Material card title renders.

### Solution 2: Block OAuth Redirect (recapture-angular-login.js)
```javascript
// Block navigation to IdentityServer
await page.route('**/connect/authorize**', route => {
  route.abort();
});

await page.goto('http://localhost:4200/login', {
  waitUntil: 'domcontentloaded',
  timeout: 10000
});

await page.waitForTimeout(2000);

await page.screenshot({
  path: path.join(imagesDir, 'angular-login-page-blocked.png'),
  fullPage: false,
});
```

Uses Playwright's route interception to block the OAuth redirect, allowing the page to remain on the login screen indefinitely.

### Solution 3: Alternative - Continue as Guest Flow

The login page also has a "Continue as Guest" button that navigates to `/dashboard` without authentication. This button does NOT trigger the auto-redirect, but it's not the primary login flow we want to showcase.

## Recommended Approach

**Use Solution 2 (recapture-angular-login.js)** for the cleanest screenshot:

```bash
cd scripts
npm run screenshots:login
```

This script:
1. Clears all cookies/storage for clean state
2. Blocks OAuth redirects
3. Navigates to `/login` route
4. Waits for page to fully render
5. Captures screenshot showing the full login card

The resulting screenshot will show:
- ✅ "Welcome to Talent Management" title
- ✅ "Sign In with Identity Server" button
- ✅ "Continue as Guest" button
- ✅ Role-based access information
- ✅ Clean, professional Material Design UI

## Alternative Design Consideration

If the auto-redirect UX is problematic for users (they never see the login page), consider:

**Option A:** Remove auto-redirect from `ngOnInit()`
```typescript
ngOnInit() {
  // Don't auto-redirect - let user click the button
  // this.login();
}
```

**Option B:** Add a delay or user confirmation
```typescript
ngOnInit() {
  // Show the page for 2 seconds before auto-redirecting
  setTimeout(() => this.login(), 2000);
}
```

**Option C:** Only auto-redirect if user came from auth guard
```typescript
ngOnInit() {
  const returnUrl = this.route.snapshot.queryParams['returnUrl'];
  if (returnUrl) {
    // User was blocked by auth guard, auto-redirect
    this.login();
  }
  // Otherwise, show the page and let them click
}
```

Currently the app uses **full auto-redirect** which provides the smoothest OAuth flow but makes the Angular login page essentially a "splash screen" that users rarely see.

## Files Involved

**Angular Routing:**
- `src/app/app.routes.ts:74` - Route definition: `{ path: 'login', component: Login }`
- `src/app/routes/sessions/login/login.ts` - Login component with auto-redirect
- `src/app/routes/sessions/login/login.html` - Login page template
- `src/app/core/authentication/oidc-auth.service.ts` - OAuth service

**Screenshot Scripts:**
- `scripts/take-all-screenshots.js` - Main screenshot script (updated)
- `scripts/recapture-angular-login.js` - Special script for login page
- `scripts/package.json` - npm scripts configuration
- `scripts/README.md` - Documentation

**Routes:**
- `/` - Root (redirects to `/dashboard` if authenticated, else `/login`)
- `/login` - Angular login page (auto-redirects to IdentityServer)
- `/auth/login` - Alternative login route (uses AuthLayout)
- `/callback` - OAuth callback handler

## Testing

To verify the login page renders correctly:

1. **Clear browser state:**
   - Open DevTools (F12)
   - Application → Clear storage → Clear site data

2. **Navigate to login:**
   ```
   http://localhost:4200/login
   ```

3. **Expected behavior:**
   - Page loads for a brief moment showing Material card
   - Immediately redirects to `https://localhost:44310/connect/authorize?...`

4. **To see the login page without redirect:**
   - Use Playwright with route blocking (Solution 2)
   - Or temporarily comment out `this.login()` in `ngOnInit()`
