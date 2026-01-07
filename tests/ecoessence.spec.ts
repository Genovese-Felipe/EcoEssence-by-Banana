import { test, expect } from '@playwright/test';

test('EcoEssence Products and Customization Sections', async ({ page }) => {
  await page.goto('http://localhost:8000');

  // Scroll to the products section
  await page.evaluate(() => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView();
    }
  });

  await page.waitForTimeout(1000); // Wait for scroll and rendering

  // Take a screenshot of the products and customization sections
  await page.screenshot({ path: '/home/jules/verification/ecoessence-local-assets.png' });
});
