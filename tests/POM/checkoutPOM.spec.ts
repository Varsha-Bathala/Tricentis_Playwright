import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { SearchPage } from '../../pages/SearchPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Proceed to Checkout', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();

  await loginPage.login(
    'jennifer123@example.com',
    'Test@1234'
  );

  // Search Laptop
  await searchPage.search('Laptop');

  // Add Laptop to cart
  await cartPage.addProductToCart();

  // Open Shopping Cart
  await cartPage.openCart();
  
  // Proceed to checkout
  await checkoutPage.proceedToCheckout();

  // Verify checkout started
  await expect(
    page.getByRole('heading', {
      name: 'Checkout',
      exact: true
    })
  ).toBeVisible();

});