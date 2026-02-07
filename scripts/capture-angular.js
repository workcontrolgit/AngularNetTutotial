// Script to capture Angular application screenshots
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Create angular images directory
const imagesDir = path.join(__dirname, '..', 'docs', 'images', 'angular');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function captureAngularScreenshots() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  try {
    console.log('📸 Capturing Angular application screenshots...\n');

    // 1. Angular Login Page - User menu dropdown with Login link
    console.log('1️⃣  Capturing Angular login page (user menu dropdown)...');
    await page.goto('http://localhost:4200', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(2000);

    // Find and click the user icon in the upper right corner to open dropdown
    console.log('   Looking for user icon in upper right corner...');

    const userIconSelectors = [
      'button[aria-label*="user" i]',
      'button[aria-label*="account" i]',
      'button mat-icon:has-text("account_circle")',
      'button mat-icon:has-text("person")',
      '.user-button',
      '.account-button',
      'button[mattooltip*="user" i]',
      'button:has(mat-icon):has-text("account")',
    ];

    let userIconFound = false;
    for (const selector of userIconSelectors) {
      try {
        const icon = await page.locator(selector).first();
        if (await icon.count() > 0) {
          console.log(`   Found user icon with selector: ${selector}`);
          // Click instead of hover to open dropdown menu
          await icon.click();
          userIconFound = true;
          break;
        }
      } catch (e) {
        // Continue trying
      }
    }

    if (!userIconFound) {
      console.log('   ⚠️  Could not find user icon, trying generic button in header...');
      // Try to find any button in the header/toolbar area
      await page.locator('mat-toolbar button').last().click();
    }

    // Wait for dropdown menu to appear with explicit selector wait
    console.log('   Waiting for dropdown menu to appear...');
    try {
      await page.waitForSelector('.mat-menu-panel, [role="menu"]', {
        state: 'visible',
        timeout: 5000
      });
      console.log('   Dropdown menu is visible');
    } catch (e) {
      console.log('   ⚠️  Dropdown menu selector not found, waiting 2 seconds...');
      await page.waitForTimeout(2000);
    }

    // Additional wait to ensure menu is fully rendered
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(imagesDir, 'angular-login-page.png'),
      fullPage: false,
    });
    console.log('   ✅ Saved: angular-login-page.png\n');

    // 2. Navigate to login page (which will redirect to IdentityServer)
    console.log('2️⃣  Navigating to login page...');

    // Navigate to login page which triggers auto-redirect to IdentityServer
    await page.goto('http://localhost:4200/login', { waitUntil: 'load', timeout: 30000 });

    // Wait for redirect to IdentityServer
    try {
      await page.waitForURL('**/Account/Login**', { timeout: 15000 });
      console.log('   Redirected to IdentityServer');
    } catch (e) {
      console.log('   Taking longer to redirect, checking URL...');
      const currentUrl = page.url();
      if (!currentUrl.includes('44310')) {
        console.log('   Not on IdentityServer yet, waiting more...');
        await page.waitForTimeout(3000);
      }
    }

    await page.waitForTimeout(2000);

    // Fill in Angular user credentials for screenshot
    await page.fill('input[name="Username"], input[name="username"], input#Username', 'ashtyn1');
    await page.fill('input[name="Password"], input[name="password"], input#Password', 'Pa$$word123');
    await page.waitForTimeout(500);

    // Capture IdentityServer login page with credentials filled
    console.log('   Capturing IdentityServer login with ashtyn1 credentials...');
    await page.screenshot({
      path: path.join(imagesDir, 'identityserver-login-ashtyn1.png'),
      fullPage: false,
    });
    console.log('   ✅ Saved: identityserver-login-ashtyn1.png\n');

    // 3. Now submit the login
    console.log('3️⃣  Logging in with Angular account (ashtyn1)...');

    // Click login button
    await page.click('button[type="submit"], button:has-text("Login"), input[type="submit"]');

    // Wait for redirect back to Angular
    console.log('   Waiting for redirect back to Angular...');
    try {
      await page.waitForURL('http://localhost:4200/**', { timeout: 30000 });
    } catch (e) {
      console.log('   Redirect taking longer, trying to navigate manually...');
      await page.goto('http://localhost:4200', { waitUntil: 'networkidle', timeout: 30000 });
    }
    await page.waitForTimeout(5000);
    console.log('   ✅ Logged in successfully\n');

    // 4. Application Dashboard
    console.log('4️⃣  Capturing application dashboard...');
    await page.screenshot({
      path: path.join(imagesDir, 'application-dashboard.png'),
      fullPage: false,
    });
    console.log('   ✅ Saved: application-dashboard.png\n');

    // 5. Navigate to Employees page
    console.log('5️⃣  Navigating to Employees page...');
    await page.goto('http://localhost:4200/employees', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    console.log('   Capturing employee list page...');
    await page.screenshot({
      path: path.join(imagesDir, 'employee-list-page.png'),
      fullPage: true,
    });
    console.log('   ✅ Saved: employee-list-page.png\n');

    // 6. Search and Filtering UI
    console.log('6️⃣  Capturing search and filtering UI...');
    await page.screenshot({
      path: path.join(imagesDir, 'search-filtering-ui.png'),
      fullPage: true,
    });
    console.log('   ✅ Saved: search-filtering-ui.png\n');

    // 7. Navigate to Create Employee form
    console.log('7️⃣  Navigating to Create Employee form...');
    await page.goto('http://localhost:4200/employees/create', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    console.log('   Capturing employee form...');
    await page.screenshot({
      path: path.join(imagesDir, 'employee-form.png'),
      fullPage: true,
    });
    console.log('   ✅ Saved: employee-form.png\n');

    // 8. CRUD Operations (back to list)
    console.log('8️⃣  Capturing CRUD operations overview...');
    await page.goto('http://localhost:4200/employees', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(imagesDir, 'crud-operations.png'),
      fullPage: true,
    });
    console.log('   ✅ Saved: crud-operations.png\n');

    console.log('✨ All Angular screenshots captured successfully!');
    console.log(`📁 Screenshots saved to: ${imagesDir}\n`);

  } catch (error) {
    console.error('❌ Error taking screenshots:', error.message);
    console.error('\nStack trace:', error.stack);
  } finally {
    await browser.close();
  }
}

captureAngularScreenshots().catch(console.error);
