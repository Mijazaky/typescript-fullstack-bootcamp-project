import { test, expect } from '@playwright/test';

test('filter products by collection', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173/');

  // Select Collection 1 from the filter dropdown
  await page.locator('div').filter({ hasText: /^Filter by collection:All CollectionsCollection 1Collection 2Collection 3$/ }).getByRole('combobox').selectOption('1');

  // Optionally assert that the correct collection is selected
  const selectedOption = await page.locator('div').filter({ hasText: /^Filter by collection:All CollectionsCollection 1Collection 2Collection 3$/ }).getByRole('combobox').inputValue();
  expect(selectedOption).toBe('1');

  // Get all displayed products and verify they belong to Collection 1
  const productsInCollection = await page.$$eval('.product-collection-id', (elements) => 
    elements.map(el => parseInt(el.textContent!, 10))
  );

  // Assert that all products belong to Collection 1
  productsInCollection.forEach(collectionId => {
    expect(collectionId).toBe(1);
  });
});
