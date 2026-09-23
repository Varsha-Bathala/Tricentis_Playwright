import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

  readonly page: Page;
  readonly termsOfService: Locator;
  readonly checkoutButton: Locator;

  readonly country: Locator;
  readonly city: Locator;
  readonly address: Locator;
  readonly zipCode: Locator;
  readonly phoneNumber: Locator;

  readonly billingContinue: Locator;
  readonly shippingContinue: Locator;
  readonly groundShipping: Locator;
  readonly shippingMethodContinue: Locator;
  readonly cashOnDelivery: Locator;
  readonly paymentMethodContinue: Locator;
  readonly paymentInfoContinue: Locator;
  readonly confirmOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.termsOfService = page.locator('#termsofservice');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });

    this.country = page.locator('#BillingNewAddress_CountryId');
    this.city = page.locator('#BillingNewAddress_City');
    this.address = page.locator('#BillingNewAddress_Address1');
    this.zipCode = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phoneNumber = page.locator('#BillingNewAddress_PhoneNumber');

    this.billingContinue = page.locator(
      'input[onclick="Billing.save()"]'
    );

    this.shippingContinue = page.locator(
      'input[onclick="Shipping.save()"]'
    );

    this.groundShipping = page.getByLabel('Ground (0.00)');

    this.shippingMethodContinue = page.locator(
      'input[onclick="ShippingMethod.save()"]'
    );

    this.cashOnDelivery = page.getByLabel(
      'Cash On Delivery (COD) (7.00)'
    );

    this.paymentMethodContinue = page.locator(
      'input[onclick="PaymentMethod.save()"]'
    );

    this.paymentInfoContinue = page.locator(
      'input[onclick="PaymentInfo.save()"]'
    );

    this.confirmOrderButton = page.locator(
      'input[onclick="ConfirmOrder.save()"]'
    );
  }

  async proceedToCheckout() {
    await this.termsOfService.check();
    await this.checkoutButton.click();
  }

  async enterBillingAddress() {

    if (await this.country.isVisible()) {

      await this.country.selectOption({
        label: 'United States'
      });

      await this.city.fill('Irving');
      await this.address.fill('123 Street');
      await this.zipCode.fill('76087');
      await this.phoneNumber.fill('9865246767');
    }

    await this.billingContinue.click();
  }

  async continueShippingAddress() {
    await this.shippingContinue.click();
  }

  async selectShippingMethod() {
    await this.groundShipping.check();
    await this.shippingMethodContinue.click();
  }

  async selectPaymentMethod() {
    await this.cashOnDelivery.check();
    await this.paymentMethodContinue.click();
  }

  async continuePaymentInformation() {
    await this.paymentInfoContinue.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}