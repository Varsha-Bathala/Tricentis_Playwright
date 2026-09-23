import { Page, Locator } from '@playwright/test';

export class CartPage {

  readonly page: Page;
  readonly laptopProduct: Locator;
  readonly addToCartButton: Locator;
  readonly cartQuantity: Locator;
  readonly shoppingCart: Locator;
  readonly product: Locator;
  readonly quantity: Locator;
  readonly updateCartButton: Locator;
  readonly removeCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;

    this.laptopProduct = page.locator('.product-item', {
      hasText: '14.1-inch Laptop'
    });

    this.addToCartButton = this.laptopProduct.getByRole(
      'button',
      { name: 'Add to cart' }
    );

    this.cartQuantity = page.locator('.cart-qty');

    this.shoppingCart = page.locator('#topcartlink a');

    this.product = page.locator('a.product-name', {
      hasText: '14.1-inch Laptop'
    });

    this.quantity = page.locator('.qty-input');

    this.updateCartButton = page.getByRole('button', {
      name: 'Update shopping cart'
    });

    this.removeCheckbox = page.locator(
      'input[name="removefromcart"]'
    );
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async openCart() {
    await this.shoppingCart.click();
  }

  async updateQuantity(quantity: string) {
    await this.quantity.fill(quantity);
    await this.updateCartButton.click();
  }

  async removeProduct() {
    await this.removeCheckbox.check();
    await this.updateCartButton.click();
  }
}