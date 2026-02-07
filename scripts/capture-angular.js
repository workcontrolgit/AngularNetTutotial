// Script to capture Angular application screenshots
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join(__dirname, '..', 'docs', 'images', 'angular');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function captureAngularScreenshots() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 800,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  const userIconSelectors = [
    'button:has(mat-icon:has-text("account_circle"))',
    'button[aria-label*="user" i]',
    'button[aria-label*="account" i]',
    'button mat-icon:has-text("account_circle")',
    'button mat-icon:has-text("person")',
    'mat-toolbar button:last-child',
  ];

  async function openUserMenu() {
    for (const selector of userIconSelectors) {
      const icon = page.locator(selector).first();
      if (await icon.count() > 0) {
        await icon.click({ timeout: 5000 });
        await page.waitForTimeout(500);
        return true;
      }
    }
    return false;
  }

  async function clickFirstAvailable(selectors) {
    for (const selector of selectors) {
      try {
        const element = page.locator(selector).first();
        if (await element.count() > 0) {
          await element.click({ timeout: 5000 });
          return true;
        }
      } catch (e) {
        // continue
      }
    }
    return false;
  }

  async function captureEntityScreenshots({ routeBase, filePrefix, label, createSelectors }) {
    console.log(`Capturing ${label} list page...`);
    await page.goto(`http://localhost:4200/${routeBase}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(imagesDir, `${filePrefix}-list-page.png`),
      fullPage: true,
    });
    console.log(`   Saved: ${filePrefix}-list-page.png`);

    console.log(`Capturing ${label} search and filtering UI...`);
    await page.screenshot({
      path: path.join(imagesDir, `${filePrefix}-search-filtering-ui.png`),
      fullPage: true,
    });
    console.log(`   Saved: ${filePrefix}-search-filtering-ui.png`);

    console.log(`Capturing ${label} CRUD operations overview...`);
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: path.join(imagesDir, `${filePrefix}-crud-operations.png`),
      fullPage: true,
    });
    console.log(`   Saved: ${filePrefix}-crud-operations.png`);

    console.log(`Capturing create ${label} form...`);
    const createClicked = await clickFirstAvailable(createSelectors);
    if (!createClicked) {
      await page.goto(`http://localhost:4200/${routeBase}/create`, { waitUntil: 'networkidle', timeout: 30000 });
    } else {
      await page.waitForURL(`**/${routeBase}/create**`, { timeout: 15000 }).catch(async () => {
        await page.goto(`http://localhost:4200/${routeBase}/create`, { waitUntil: 'networkidle', timeout: 30000 });
      });
    }

    await page.waitForTimeout(1200);
    await page.screenshot({
      path: path.join(imagesDir, `${filePrefix}-form.png`),
      fullPage: true,
    });
    console.log(`   Saved: ${filePrefix}-form.png\n`);
  }

  try {
    console.log('Capturing Angular application screenshots...\n');

    console.log('1) Capturing anonymous dashboard before login...');
    await page.goto('http://localhost:4200/dashboard', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(imagesDir, 'application-dashboard-anonymous.png'),
      fullPage: false,
    });
    console.log('   Saved: application-dashboard-anonymous.png\n');

    console.log('2) Capturing user menu with login link...');
    const menuOpenedBeforeLogin = await openUserMenu();
    if (!menuOpenedBeforeLogin) {
      throw new Error('Could not open user menu before login.');
    }
    await page.screenshot({
      path: path.join(imagesDir, 'angular-login-page.png'),
      fullPage: false,
    });
    console.log('   Saved: angular-login-page.png\n');

    console.log('3) Logging in via IdentityServer...');
    let loginClicked = await clickFirstAvailable([
      '[role="menuitem"]:has-text("Login")',
      '[role="menuitem"]:has-text("Sign in")',
      'button:has-text("Login")',
      'a:has-text("Login")',
      'a[href*="/login"]',
    ]);

    if (!loginClicked) {
      const menuReopened = await openUserMenu();
      if (menuReopened) {
        loginClicked = await clickFirstAvailable([
          '[role="menuitem"]:has-text("Login")',
          '[role="menuitem"]:has-text("Sign in")',
          'button:has-text("Login")',
          'a:has-text("Login")',
          'a[href*="/login"]',
        ]);
      }
    }

    if (!loginClicked) {
      throw new Error('Could not click Login from Angular user menu.');
    }

    await page.waitForURL('**://localhost:44310/**', { timeout: 30000 });
    await page.waitForTimeout(1200);

    await page.fill('input[name="Username"], input[name="username"], input#Username', 'ashtyn1');
    await page.fill('input[name="Password"], input[name="password"], input#Password', 'Pa$$word123');
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(imagesDir, 'identityserver-login-ashtyn1.png'),
      fullPage: false,
    });
    console.log('   Saved: identityserver-login-ashtyn1.png');

    await clickFirstAvailable([
      'button[type="submit"]',
      'button:has-text("Login")',
      'input[type="submit"]',
    ]);

    await page.waitForURL('http://localhost:4200/**', { timeout: 30000 }).catch(async () => {
      await page.goto('http://localhost:4200/dashboard', { waitUntil: 'networkidle', timeout: 30000 });
    });
    await page.waitForTimeout(1500);
    console.log('   Logged in successfully\n');

    console.log('4) Capturing profile page from user menu...');
    const profileMenuOpened = await openUserMenu();
    if (!profileMenuOpened) {
      throw new Error('Could not open user menu to navigate to profile page.');
    }

    const profileClicked = await clickFirstAvailable([
      '[role="menuitem"]:has-text("Profile")',
      '[role="menuitem"]:has-text("Overview")',
      'a:has-text("Profile")',
      'button:has-text("Profile")',
      'a[href*="/profile"]',
    ]);

    if (!profileClicked) {
      throw new Error('Could not click Profile from user menu.');
    }

    await page.waitForURL('**/profile/**', { timeout: 15000 }).catch(async () => {
      await page.goto('http://localhost:4200/profile/overview', { waitUntil: 'networkidle', timeout: 30000 });
    });
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: path.join(imagesDir, 'profile-overview-page.png'),
      fullPage: true,
    });
    console.log('   Saved: profile-overview-page.png\n');

    console.log('5) Capturing entity pages for Employee, Department, Position, and Salary Range...');
    await captureEntityScreenshots({
      routeBase: 'employees',
      filePrefix: 'employee',
      label: 'employee',
      createSelectors: [
        'a:has-text("Create")',
        'button:has-text("Create")',
        'a:has-text("Add Employee")',
        'button:has-text("Add Employee")',
        'a[href*="/employees/create"]',
        'button[routerlink*="/employees/create"]',
      ],
    });

    await captureEntityScreenshots({
      routeBase: 'departments',
      filePrefix: 'department',
      label: 'department',
      createSelectors: [
        'a:has-text("Create")',
        'button:has-text("Create")',
        'a:has-text("Add Department")',
        'button:has-text("Add Department")',
        'a[href*="/departments/create"]',
        'button[routerlink*="/departments/create"]',
      ],
    });

    await captureEntityScreenshots({
      routeBase: 'positions',
      filePrefix: 'position',
      label: 'position',
      createSelectors: [
        'a:has-text("Create")',
        'button:has-text("Create")',
        'a:has-text("Add Position")',
        'button:has-text("Add Position")',
        'a[href*="/positions/create"]',
        'button[routerlink*="/positions/create"]',
      ],
    });

    await captureEntityScreenshots({
      routeBase: 'salary-ranges',
      filePrefix: 'salary-range',
      label: 'salary range',
      createSelectors: [
        'a:has-text("Create")',
        'button:has-text("Create")',
        'a:has-text("Add Salary Range")',
        'button:has-text("Add Salary Range")',
        'a[href*="/salary-ranges/create"]',
        'button[routerlink*="/salary-ranges/create"]',
      ],
    });

    console.log('6) Capturing user menu with logout link...');
    await page.goto('http://localhost:4200/dashboard', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    const menuOpenedAfterLogin = await openUserMenu();
    if (!menuOpenedAfterLogin) {
      throw new Error('Could not open user menu after login.');
    }

    await page.screenshot({
      path: path.join(imagesDir, 'user-menu-logout-link.png'),
      fullPage: false,
    });
    console.log('   Saved: user-menu-logout-link.png');

    const logoutClicked = await clickFirstAvailable([
      '[role="menuitem"]:has-text("Logout")',
      '[role="menuitem"]:has-text("Log out")',
      'button:has-text("Logout")',
      'a:has-text("Logout")',
      'a[href*="logout" i]',
    ]);

    if (!logoutClicked) {
      throw new Error('Could not click Logout menu item.');
    }

    await page.waitForTimeout(1200);
    await page.screenshot({
      path: path.join(imagesDir, 'identityserver-logout-intermediate.png'),
      fullPage: true,
    });
    console.log(`   Saved: identityserver-logout-intermediate.png (URL: ${page.url()})`);

    const hereClicked = await clickFirstAvailable([
      'a:has-text("Click Here")',
      'a:has-text("here")',
      'a:has-text("click here")',
      'form button[type="submit"]',
      'form input[type="submit"]',
    ]);

    if (hereClicked) {
      await page.waitForURL('http://localhost:4200/**', { timeout: 30000 }).catch(async () => {
        await page.goto('http://localhost:4200', { waitUntil: 'networkidle', timeout: 30000 });
      });
      console.log('   Clicked Here and redirected back to Angular.\n');
    } else {
      console.log('   Could not find Click Here link/button on logout page.\n');
    }

    console.log('Angular screenshot flow completed successfully.');
    console.log(`Screenshots saved to: ${imagesDir}\n`);
  } catch (error) {
    console.error('Error taking screenshots:', error.message);
    console.error('\nStack trace:', error.stack);
  } finally {
    await browser.close();
  }
}

captureAngularScreenshots().catch(console.error);
