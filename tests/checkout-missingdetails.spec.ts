// This is a test file for an order completion failure due to missing information on the 'checkout' page.

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../test-data/users';
import { products } from '../test-data/products';
import { customer, checkoutErrors } from '../test-data/checkout';


//1. naming and and pages:
test.describe('Checkout form validation', () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addToCart(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  //2. loop test for 1 of each missing- first name, last name, and postal code
  const missingFieldCases = [
    {
      field: 'first name',
      data: { ...customer, firstName: '' },
      error: checkoutErrors.firstNameRequired,
    },
    {
      field: 'last name',
      data: { ...customer, lastName: '' },
      error: checkoutErrors.lastNameRequired,
    },
    {
      field: 'postal code',
      data: { ...customer, postalCode: '' },
      error: checkoutErrors.postalCodeRequired,
    },
  ];

  for (const { field, data, error } of missingFieldCases) {
    test(`missing ${field} shows "${error}"`, async ({ page }) => {
      await checkoutPage.fillInformation(data.firstName, data.lastName, data.postalCode);

      await expect(checkoutPage.errorMessage).toHaveText(error);
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
  }

  //all 3 tabs are missing
  test('all fields empty shows the first name error first', async () => {
    await checkoutPage.fillInformation('', '', '');

    await expect(checkoutPage.errorMessage).toHaveText(checkoutErrors.firstNameRequired);
  });
});