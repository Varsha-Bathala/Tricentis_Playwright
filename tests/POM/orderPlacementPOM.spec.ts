import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { SearchPage } from '../../pages/SearchPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Complete Order Placement', async ({ page }) => {

  test.setTimeout(120000);

  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();

  await loginPage.login(
    'jenniferd123@example.com',
    'Test@1234'
  );

  // Verify login
  await expect(
    page.getByText(
      'jenniferd123@example.com',
      { exact: true }
    )
  ).toBeVisible();

  // Search Laptop
  await searchPage.search('Laptop');

  // Add Laptop to cart
  await cartPage.addProductToCart();

  // Open Shopping Cart
  await cartPage.openCart();

  // Make sure cart page opened
  await expect(
    cartPage.product
  ).toBeVisible();

  // Proceed to checkout
  await checkoutPage.proceedToCheckout();

  // Verify checkout page
  await expect(
    page.getByRole('heading', {
      name: 'Checkout',
      exact: true
    })
  ).toBeVisible();

  // Billing Address
  await checkoutPage.enterBillingAddress();

  // Shipping Address
  await checkoutPage.continueShippingAddress();

  // Shipping Method
  await checkoutPage.selectShippingMethod();

  // Payment Method
  await checkoutPage.selectPaymentMethod();

  // Verify COD information
  await expect(
    page.getByText('You will pay by COD')
  ).toBeVisible();

  // Payment Information
  await checkoutPage.continuePaymentInformation();

  // Confirm Order
  await checkoutPage.confirmOrder();

  // Verify successful order
  await expect(
    page.getByText(
      'Your order has been successfully processed!',
      { exact: true }
    )
  ).toBeVisible();

});