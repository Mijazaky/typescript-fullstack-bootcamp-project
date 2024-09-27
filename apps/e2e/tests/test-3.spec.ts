import { test, expect } from '@playwright/test';

test('search for a product by name', async ({ page }) => {
  // Go to the homepage
  await page.goto('http://localhost:5173/');
  
  // Click on the search input and fill it with a product name
  await page.getByPlaceholder('Search by name...').click();
  await page.getByPlaceholder('Search by name...').fill('The color purple');
  
  // Click the 'Search' button
  await page.getByRole('button', { name: 'Search' }).click();
  
  // Assert that the correct product is displayed on the page after the search
  const productName = await page.locator('h1').first();
  await expect(productName).toHaveText('The Color Purple');
  
  // Optionally, check if other product details are correct (author, price, etc.)
  const productAuthor = await page.locator('h2').nth(0);
  await expect(productAuthor).toHaveText('Alice Walker');
  
  const productPrice = await page.locator('h2').nth(1); // Assuming the price is in the 4th h2 element
  await expect(productPrice).toHaveText('$32.00'); 
});
