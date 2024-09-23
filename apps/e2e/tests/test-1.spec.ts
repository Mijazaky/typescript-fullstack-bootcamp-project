import { test, expect } from '@playwright/test';

test('sort products by price from highest to lowest', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173/');

  // Select the option 'desc' (Highest to Lowest) from the sort dropdown
  await page.locator('div').filter({ hasText: /^Sort by price:Lowest to HighestHighest to Lowest$/ }).getByRole('combobox').selectOption('desc');

  // Optionally assert that the correct option is selected
  const selectedOption = await page.locator('div').filter({ hasText: /^Sort by price:Lowest to HighestHighest to Lowest$/ }).getByRole('combobox').inputValue();
  expect(selectedOption).toBe('desc');

  // Get the list of product prices after sorting
  const prices = await page.$$eval('.product-price-selector', (elements) => 
    elements.map(el => parseFloat(el.textContent!.replace('$', '')))
  );

  // Ensure that the prices are in descending order
  for (let i = 0; i < prices.length - 1; i++) {
    expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
  }
});

