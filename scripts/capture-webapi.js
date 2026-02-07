// Script to capture Web API screenshots (Swagger UI)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Create webapi images directory
const imagesDir = path.join(__dirname, '..', 'docs', 'images', 'webapi');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function captureWebAPIScreenshots() {
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
    console.log('📸 Capturing Web API screenshots...\n');

    // 1. Swagger UI
    console.log('1️⃣  Capturing Swagger UI...');
    await page.goto('https://localhost:44378/swagger', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(imagesDir, 'swagger-api-endpoints.png'),
      fullPage: true,
    });
    console.log('   ✅ Saved: swagger-api-endpoints.png\n');

    console.log('✨ All Web API screenshots captured successfully!');
    console.log(`📁 Screenshots saved to: ${imagesDir}\n`);

  } catch (error) {
    console.error('❌ Error taking screenshots:', error.message);
    console.error('\nStack trace:', error.stack);
  } finally {
    await browser.close();
  }
}

captureWebAPIScreenshots().catch(console.error);
