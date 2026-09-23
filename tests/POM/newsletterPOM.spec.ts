import { test, expect } from '@playwright/test';
import { NewsletterPage } from '../../pages/NewsletterPage';

test('Newsletter Subscription', async ({ page }) => {

  const newsletterPage = new NewsletterPage(page);

  // Open website
  await newsletterPage.goto();

  // Subscribe
  await newsletterPage.subscribe(
    'jennifer123@example.com'
  );

  // Verify successful subscription
  await expect(
    newsletterPage.resultMessage
  ).toContainText('Thank you for signing up!');

});