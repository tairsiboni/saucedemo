// This is a test file for an E2E order completion.

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../test-data/users';
import { products } from '../test-data/products';
import { customer, TAX_RATE, orderCompleteMessage} from '../test-data/checkout';
import { moneyFrom, toCents } from '../utils/money';


//1.naming and and pages:
test.describe('End-to-end checkout', () => {
  test('valid user completes a purchase and the overview totals are calculated correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const selected = [products.backpack, products.bikeLight, products.fleeceJacket];

//2. login and add products to the cart
    
    await test.step('log in', async () => {
      await loginPage.goto();
      await loginPage.login(users.standard.username, users.standard.password);
      await expect(inventoryPage.title).toHaveText('Products');
    });

    await test.step('add products to the cart', async () => {
      for (const product of selected) {
        await inventoryPage.addToCart(product.name);
      }
      await expect(inventoryPage.cartBadge).toHaveText(String(selected.length));
    });

    await test.step('go to checkout and fill in customer information', async () => {
      await inventoryPage.openCart();
      await cartPage.checkout();
      await checkoutPage.fillInformation(customer.firstName, customer.lastName, customer.postalCode);
      await expect(page).toHaveURL(/checkout-step-two\.html/);
    });

//3. verify the item prices, tax, and total are correct

    await test.step('verify item total, tax and total on the overview page', async () => {
      await checkoutPage.itemPrices.first().waitFor();
      const itemPrices = await checkoutPage.getItemPrices();
      const summary = await checkoutPage.getSummary();

      const expectedItemTotal = itemPrices.reduce((sum, price) => sum + toCents(price), 0);
      const expectedTax = Math.round(expectedItemTotal * TAX_RATE);

      expect(itemPrices).toEqual(selected.map((p) => moneyFrom(p.price)));
      expect(toCents(summary.itemTotal)).toBe(expectedItemTotal);
      expect(toCents(summary.tax)).toBe(expectedTax);
      expect(toCents(summary.total)).toBe(expectedItemTotal + expectedTax);
    });

    //4. finish the order and see the confirmation page

    await test.step('finish the order and see the confirmation page', async () => {
      await checkoutPage.finish();
      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(checkoutPage.completeHeader).toHaveText(orderCompleteMessage);
      await expect(inventoryPage.cartBadge).toBeHidden();
    });


    });
 });