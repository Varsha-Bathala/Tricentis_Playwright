import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';


test('Valid Login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  // Open login page
  await loginPage.goto();

  // Login with valid credentials
  await loginPage.login(
    'jennifer123@example.com',
    'Test@1234'
  );

  // Verify login successful
  await expect(
    page.getByText('jennifer123@example.com', { exact: true })
  ).toBeVisible();

});


test('Invalid Login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  // Open login page
  await loginPage.goto();

  // Login with invalid credentials
  await loginPage.login(
    'wronguser@example.com',
    'WrongPassword123'
  );

  // Verify login failed
  await expect(
    page.getByText('No customer account found')
  ).toBeVisible();

});