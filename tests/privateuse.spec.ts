//this test page is for practice and learning purposes only for Playwright and TypeScript syntax. It is not part of the original project.

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../test-data/users';
import { products } from '../test-data/products';
import { customer, TAX_RATE, orderCompleteMessage} from '../test-data/checkout';
import { moneyFrom, toCents } from '../utils/money';



//test description, before each, pages

 test.describe('Login functionality tests', () => {
  let loginPage: LoginPage;

  //before each test, go to the login page
 test.beforeEach(async ({ page }) => {
   const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

  //put the rest of the tests here:
test('login with valid credentials lands on the products page.', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(new InventoryPage(page).title).toHaveText('Products');

  });
  
});