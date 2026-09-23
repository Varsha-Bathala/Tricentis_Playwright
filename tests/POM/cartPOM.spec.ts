import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { SearchPage } from '../../pages/SearchPage';

test('Add Product to Cart', async ({ page }) => {

  const cartPage = new CartPage(page);
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.search('Laptop');
  await cartPage.addProductToCart();

  // Verify product was added
  await expect(
    page.getByText('The product has been added to your shopping cart')
  ).toBeVisible();

  // Verify cart quantity
  await expect(
    cartPage.cartQuantity
  ).toHaveText('(1)');

});


test('Update Cart Quantity', async ({ page }) => {

  const cartPage = new CartPage(page);
  const searchPage = new SearchPage(page);
  await searchPage.goto();

  await searchPage.search('Laptop');
  await cartPage.addProductToCart();

  // Verify product was added
  await expect(
    cartPage.cartQuantity
  ).toHaveText('(1)');

  // Open shopping cart
  await cartPage.openCart();

  // Verify Laptop is in cart
  await expect(
    cartPage.product
  ).toBeVisible();

  // Change quantity to 2
  await cartPage.updateQuantity('2');

  // Verify quantity changed
  await expect(
    cartPage.quantity
  ).toHaveValue('2');

});


test('Remove Product from Cart', async ({ page }) => {

  const cartPage = new CartPage(page);
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.search('Laptop');
  await cartPage.addProductToCart();

  // Verify product was added
  await expect(
    cartPage.cartQuantity
  ).toHaveText('(1)');

  // Open shopping cart
  await cartPage.openCart();

  // Verify Laptop is in cart
  await expect(
    cartPage.product
  ).toBeVisible();

  // Remove product
  await cartPage.removeProduct();

  // Verify cart is empty
  await expect(
    page.getByText('Your Shopping Cart is empty!')
  ).toBeVisible();

});