# Tutorial Screenshot Automation

This folder contains Playwright scripts to automatically capture screenshots for the tutorial documentation.

## Prerequisites

1. **Install dependencies:**
   ```bash
   cd scripts
   npm install
   ```

2. **Start all services** (in separate terminals):
   ```bash
   # Terminal 1: IdentityServer
   cd TokenService/Duende-IdentityServer/src/Duende.STS.Identity
   dotnet run

   # Terminal 2: API
   cd ApiResources/TalentManagement-API
   dotnet run

   # Terminal 3: Angular
   cd Clients/TalentManagement-Angular-Material/talent-management
   npm start
   ```

3. **Verify services are running:**
   - IdentityServer: https://localhost:44310
   - API: https://localhost:44378
   - Angular: http://localhost:4200

## Usage

### Capture Screenshots by Component

The scripts are organized by application component for better control:

#### 1. Capture Angular Screenshots
```bash
cd scripts
npm run screenshots:angular
```

**Credentials:** `ashtyn1` / `Pa$$word123`

**Captures:**
- angular-login-page.png - Angular user menu dropdown showing Login link
- identityserver-login-ashtyn1.png - IdentityServer login with ashtyn1 credentials filled
- application-dashboard.png - Dashboard after login
- employee-list-page.png - Employee list view
- search-filtering-ui.png - Search and filtering UI
- employee-form.png - Create employee form (from /employees/create)
- crud-operations.png - CRUD operations demonstration

**Total:** 7 screenshots

**Saved to:** `docs/images/angular/`

#### 2. Capture Web API Screenshots
```bash
cd scripts
npm run screenshots:webapi
```

**Credentials:** None (no login required)

**Captures:**
- swagger-api-endpoints.png - Swagger UI with API endpoints

**Saved to:** `docs/images/webapi/`

#### 3. Capture IdentityServer Screenshots
```bash
cd scripts
npm run screenshots:identityserver
```

**Credentials:** `admin` / `Pa$$word123`

**Captures:**
- identityserver-login.png - IdentityServer login page (empty)
- identityserver-login-admin.png - IdentityServer login with admin credentials filled
- identityserver-admin-ui.png - Admin UI dashboard (after login)

**Total:** 3 screenshots

**Saved to:** `docs/images/identityserver/`

#### 4. Capture All Screenshots
```bash
cd scripts
npm run screenshots:all
```

Runs all three scripts sequentially.

## Directory Structure

Screenshots are organized by application component:

```
docs/images/
├── angular/              # Angular application screenshots (7 files)
│   ├── angular-login-page.png
│   ├── identityserver-login-ashtyn1.png
│   ├── application-dashboard.png
│   ├── employee-list-page.png
│   ├── search-filtering-ui.png
│   ├── employee-form.png
│   └── crud-operations.png
├── webapi/              # Web API screenshots (1 file)
│   └── swagger-api-endpoints.png
└── identityserver/      # IdentityServer screenshots (3 files)
    ├── identityserver-login.png
    ├── identityserver-login-admin.png
    └── identityserver-admin-ui.png
```

## Scripts

### Main Scripts (Organized by Component)

- **capture-angular.js** - Captures all Angular application screenshots
  - Uses Angular user account: `ashtyn1` / `Pa$$word123`
  - Navigates through login flow, dashboard, employee management
  - Saves to `docs/images/angular/`

- **capture-webapi.js** - Captures Web API screenshots
  - No authentication required
  - Captures Swagger UI
  - Saves to `docs/images/webapi/`

- **capture-identityserver.js** - Captures IdentityServer screenshots
  - Uses admin account: `admin` / `Pa$$word123`
  - Captures login page (empty), login with admin credentials, and admin UI
  - Saves to `docs/images/identityserver/`

## Authentication Credentials

### Angular Application User
```json
{
  "Username": "ashtyn1",
  "Password": "Pa$$word123"
}
```

Used by: `capture-angular.js`

### IdentityServer Admin
```json
{
  "Username": "admin",
  "Password": "Pa$$word123"
}
```

Used by: `capture-identityserver.js`

### Web API
No authentication required for Swagger UI.

## Important Notes

### Angular Login Page Auto-Redirect

The Angular login page (`http://localhost:4200/login`) **automatically redirects** to IdentityServer via `ngOnInit()`:

**File:** `src/app/routes/sessions/login/login.ts:49`
```typescript
ngOnInit() {
  // Automatically redirect to IdentityServer login when this page loads
  this.login();
}
```

This means:
- The page renders for only ~100ms before redirecting
- Users rarely see this page in normal flow
- Screenshot capture must be very fast or block the redirect

The `capture-angular.js` script captures this page quickly before the redirect occurs.

### Direct URL Navigation

The scripts use direct URL navigation for reliability:
- **Employee List:** `http://localhost:4200/employees`
- **Create Employee:** `http://localhost:4200/employees/create`

This avoids issues with clicking navigation elements and ensures consistent screenshots.

## Troubleshooting

### Services Not Running

**Error:** `net::ERR_CONNECTION_REFUSED`

**Solution:** Ensure all three services are running:
```bash
# Check if ports are in use
netstat -ano | findstr ":4200"   # Angular
netstat -ano | findstr ":44378"  # API
netstat -ano | findstr ":44310"  # IdentityServer
```

### Authentication Failed

**Error:** Login fails or wrong credentials

**Solution:** Verify credentials match:
- Angular: `ashtyn1` / `Pa$$word123`
- IdentityServer Admin: `admin` / `Pa$$word123`

### Screenshots Are Empty/Wrong

**Problem:** Screenshots show blank pages or wrong content

**Solution:**
1. Increase `waitForTimeout` values in scripts
2. Check `waitUntil: 'networkidle'` is working
3. Run scripts in non-headless mode (`headless: false`) to debug

### Browser Doesn't Close

**Problem:** Playwright browser windows remain open

**Solution:** The scripts use `headless: false` for visibility. Change to `headless: true` for automated runs:
```javascript
const browser = await chromium.launch({
  headless: true,  // Change to true
  slowMo: 1000,
});
```

## Package.json Scripts Reference

```json
{
  "scripts": {
    "screenshots:angular": "node capture-angular.js",
    "screenshots:webapi": "node capture-webapi.js",
    "screenshots:identityserver": "node capture-identityserver.js",
    "screenshots:all": "npm run screenshots:angular && npm run screenshots:webapi && npm run screenshots:identityserver"
  }
}
```

## Development

To modify screenshot capture:

1. Edit the appropriate script (`capture-angular.js`, `capture-webapi.js`, or `capture-identityserver.js`)
2. Adjust selectors, wait times, or navigation URLs
3. Run the specific script to test: `npm run screenshots:angular`
4. Verify screenshots in `docs/images/{component}/`

## Contributing

When adding new screenshots:
1. Add capture logic to the appropriate component script
2. Save to the correct `docs/images/{component}/` folder
3. Update this README with the new screenshot details
4. Update tutorial documentation to reference the new images
