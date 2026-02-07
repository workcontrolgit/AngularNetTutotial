# Credentials Update Summary

## Overview

Updated all tutorial documentation to reflect the correct test credentials used in the TalentManagement application.

## Credentials

### Angular Application User

Used for logging into the Angular client application:

```
Username: ashtyn1
Password: Pa$$word123
```

**Roles:** HRAdmin, Manager

**Purpose:**
- Main application login
- Full access to employee management features
- Can create, read, update, and delete employees
- Used in screenshot automation (`capture-angular.js`)

### IdentityServer Admin UI

Used for accessing the IdentityServer administration interface:

```
Username: admin
Password: Pa$$word123
```

**Purpose:**
- Access IdentityServer Admin UI (https://localhost:44303)
- Manage clients, API resources, and identity resources
- Configure OAuth 2.0 / OIDC settings
- Used in screenshot automation (`capture-identityserver.js`)

## Files Updated

### Documentation Files

1. **docs/01-foundation.md**
   - Line 237-244: Updated login credentials section
   - Line 559-574: Updated user seed data example
   - Line 742-745: Updated "Try these actions" credentials

2. **docs/05-advanced-topics.md**
   - Line 349-350: Updated Playwright test credentials

3. **README.md**
   - Added "Test Credentials" section after line 89
   - Documents both Angular user and IdentityServer admin credentials

4. **CLAUDE.md**
   - Line 239: Added specific credentials to verification steps
   - Added Admin UI access section

### Screenshot Scripts

All screenshot automation scripts already use the correct credentials:

1. **scripts/capture-angular.js**
   - Uses: `ashtyn1` / `Pa$$word123`
   - Captures: Angular application screenshots with login flow

2. **scripts/capture-identityserver.js**
   - Uses: `admin` / `Pa$$word123`
   - Captures: IdentityServer login and admin UI screenshots

3. **scripts/capture-webapi.js**
   - No credentials required (Swagger UI is public)

## Changes Made

### From Old Credentials

**Before:**
```
Username: alice
Password: Pass123$
```

**After:**
```
Username: ashtyn1
Password: Pa$$word123
```

### User Profile Changes

**Before (alice):**
- Email: alice@example.com
- Name: Alice Smith
- Roles: Admin

**After (ashtyn1):**
- Email: ashtyn1@example.com
- Name: Ashtyn Doe
- Roles: HRAdmin, Manager

## Verification

To verify the credentials work:

### Angular Application
```bash
1. Start all three services
2. Navigate to http://localhost:4200
3. Click "Sign In with Identity Server"
4. Enter username: ashtyn1
5. Enter password: Pa$$word123
6. Should redirect to dashboard with full access
```

### IdentityServer Admin UI
```bash
1. Navigate to https://localhost:44303
2. Enter username: admin
3. Enter password: Pa$$word123
4. Should see IdentityServer admin dashboard
```

## Screenshot Organization

All screenshots are organized in:

```
docs/images/
├── angular/              (7 screenshots)
│   ├── angular-login-page.png
│   ├── identityserver-login-ashtyn1.png    ← Shows ashtyn1 credentials
│   └── ...
└── identityserver/      (3 screenshots)
    ├── identityserver-login.png
    ├── identityserver-login-admin.png      ← Shows admin credentials
    └── identityserver-admin-ui.png
```

## Documentation References

All credential references are now consistent across:

- ✅ Tutorial documentation (docs/*.md)
- ✅ README.md (main repository guide)
- ✅ CLAUDE.md (developer guide)
- ✅ Screenshot automation scripts
- ✅ Screenshot README (scripts/README.md)

## Testing Checklist

- [x] Angular login with ashtyn1 works
- [x] IdentityServer admin login with admin works
- [x] Screenshot automation scripts use correct credentials
- [x] All documentation updated
- [x] Screenshots show correct credentials in login pages

## Notes

- The password `Pa$$word123` uses double dollar signs (`$$`) which may need escaping in some contexts
- The `ashtyn1` user has both HRAdmin and Manager roles, providing full access to all features
- The `admin` user is specific to IdentityServer administration, not the Angular application
- All screenshots captured with these credentials are saved in organized folders
