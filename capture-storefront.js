// Quick script to capture storefront section screenshot
import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 414, height: 896 }, // Phone frame size
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 10000 });
    // Scroll down to bring storefront into view (phone viewport)
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(500);

    // Screenshot the whole page (storefront should be visible after scroll)
    await page.screenshot({
      path: '/Users/rahul.pramod/Desktop/App Clone - v1/storefront-screenshot.png',
      fullPage: false
    });
    console.log('Screenshot saved to storefront-screenshot.png');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
