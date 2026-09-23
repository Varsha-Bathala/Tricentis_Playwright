import { Page, Locator } from '@playwright/test';

export class NewsletterPage {

  readonly page: Page;
  readonly email: Locator;
  readonly subscribeButton: Locator;
  readonly resultMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.email = page.locator('#newsletter-email');
    this.subscribeButton = page.locator('#newsletter-subscribe-button');
    this.resultMessage = page.locator('#newsletter-result-block');
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }

  async subscribe(email: string) {
    await this.email.fill(email);
    await this.subscribeButton.click();
  }
}