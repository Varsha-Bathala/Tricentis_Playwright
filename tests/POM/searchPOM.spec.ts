import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test('Valid Product Search', async ({ page }) => {

  const searchPage = new SearchPage(page);

  // Open website
  await searchPage.goto();

  // Search for product
  await searchPage.search('Laptop');

  // Verify Laptop appears in search results
  await expect(
    page.getByText('14.1-inch Laptop', { exact: true })
  ).toBeVisible();

});