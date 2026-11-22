// Tests for problem_user - known UI bugs, marked with test.fail()

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../test-data/users';
import { products } from '../test-data/products';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { customer } from '../test-data/checkout';

test.describe('Problem user', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.problem.username, users.problem.password);

    inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.title).toHaveText('Products');
  });


  test('sorting Z to A does not change the order', async () => {
    test.fail(true, 'Known bug: sorting does nothing for problem_user');

    const names = await inventoryPage.getProductNames();
    const expected = [...names].sort((a, b) => b.localeCompare(a));

    await inventoryPage.sortBy('za');

    await expect(inventoryPage.itemNames).toHaveText(expected);
  });



    test('adding the fleece jacket updates the cart badge', async () => {
    test.fail(true, 'Known bug: Add to cart does not work for some products');

    await inventoryPage.addToCart(products.fleeceJacket.name);

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });


  
  test('checkout accepts the last name and continues to the overview', async ({ page }) => {
    test.fail(true, 'Known bug: typing the last name overwrites the first name');

    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(customer.firstName, customer.lastName, customer.postalCode);

    await expect(page).toHaveURL(/checkout-step-two/);
  });


});