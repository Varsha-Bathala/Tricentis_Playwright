import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';

test('User Registration', async ({ page }) => {

  const registrationPage = new RegistrationPage(page);

  // Open registration page
  await registrationPage.goto();

  // Generate unique email
  const email = `jennifer${Date.now()}@example.com`;

  // Register user
  await registrationPage.register(
    'Jennifer',
    'Doe',
    email,
    'Test@123'
  );

  // Verify successful registration
   await expect(
    page.getByText('Your registration completed')
  ).toBeVisible();
});