// Script to capture IdentityServer screenshots
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Create identityserver images directory
const imagesDir = path.join(__dirname, '..', 'docs', 'images', 'identityserver');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function captureIdentityServerScreenshots() {
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
    console.log('📸 Capturing IdentityServer screenshots...\n');

    // 1. IdentityServer Login Page (empty)
    console.log('1️⃣  Capturing IdentityServer login page...');
    await page.goto('https://localhost:44310/Account/Login', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(imagesDir, 'identityserver-login.png'),
      fullPage: false,
    });
    console.log('   ✅ Saved: identityserver-login.png\n');

    // 2. IdentityServer Login Page with admin credentials
    console.log('2️⃣  Capturing IdentityServer login with admin credentials...');
    await page.fill('input[name="Username"], input[name="username"], input#Username', 'admin');
    await page.fill('input[name="Password"], input[name="password"], input#Password', 'Pa$$word123');
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(imagesDir, 'identityserver-login-admin.png'),
      fullPage: false,
    });
    console.log('   ✅ Saved: identityserver-login-admin.png\n');

    // 3. IdentityServer Admin UI
    console.log('3️⃣  Navigating to IdentityServer Admin UI...');
    await page.goto('https://localhost:44303', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Check if we need to login to Admin UI
    const hasLoginForm = await page.locator('input[name="Username"], input[name="username"]').count() > 0;

    if (hasLoginForm) {
      console.log('   Logging in with admin credentials...');

      // Fill in admin credentials
      await page.fill('input[name="Username"], input[name="username"]', 'admin');
      await page.fill('input[name="Password"], input[name="password"]', 'Pa$$word123');

      // Click login button
      const submitSelectors = [
        'button[type="submit"]',
        'button:has-text("Login")',
        'button:has-text("Sign In")',
        'input[type="submit"]',
      ];

      let submitted = false;
      for (const selector of submitSelectors) {
        try {
          const button = await page.locator(selector).first();
          if (await button.count() > 0) {
            await button.click({ timeout: 5000 });
            submitted = true;
            break;
          }
        } catch (e) {}
      }

      if (!submitted) {
        await page.press('input[name="Password"]', 'Enter');
      }

      // Wait for dashboard to load
      await page.waitForTimeout(5000);
      console.log('   ✅ Logged in successfully');
    } else {
      console.log('   ℹ️  Already logged in or no login required');
    }

    await page.screenshot({
      path: path.join(imagesDir, 'identityserver-admin-ui.png'),
      fullPage: false,
    });
    console.log('   ✅ Saved: identityserver-admin-ui.png\n');

    console.log('✨ All IdentityServer screenshots captured successfully!');
    console.log(`📁 Screenshots saved to: ${imagesDir}\n`);

  } catch (error) {
    console.error('❌ Error taking screenshots:', error.message);
    console.error('\nStack trace:', error.stack);
  } finally {
    await browser.close();
  }
}

captureIdentityServerScreenshots().catch(console.error);
