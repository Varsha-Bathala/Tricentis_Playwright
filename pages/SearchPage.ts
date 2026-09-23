import { Page, Locator } from '@playwright/test';

export class SearchPage {

  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }

  async search(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
  }
}