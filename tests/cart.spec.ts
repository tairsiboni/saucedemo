// This is a test file for the cart functionality in the INVENTORY page.

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../test-data/users';
import { products } from '../test-data/products';   

test.describe('Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await expect(inventoryPage.title).toHaveText('Products');
  });

//tets for- adding and removing products from the cart impacts the cart badge count

  test('adding several products updates the cart badge count', async () => {
    await expect(inventoryPage.cartBadge).toBeHidden();

    await inventoryPage.addToCart(products.backpack.name);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.addToCart(products.bikeLight.name);
    await inventoryPage.addToCart(products.boltTShirt.name);
    await expect(inventoryPage.cartBadge).toHaveText('3');
  });



//test for removing products from the cart updates the cart badge count

  test('removing a product updates the badge and the cart contents', async () => {
    await inventoryPage.addToCart(products.backpack.name);
    await inventoryPage.addToCart(products.bikeLight.name);
    await inventoryPage.addToCart(products.boltTShirt.name);
    await expect(inventoryPage.cartBadge).toHaveText('3');

    await inventoryPage.removeFromCart(products.bikeLight.name);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveText([products.backpack.name, products.boltTShirt.name]);
  });

//test for verifying that the cart shows the correct product names and prices after adding products to the cart

  test('cart shows the correct product names and prices', async () => {
    const selected = [products.backpack, products.bikeLight, products.fleeceJacket];
    for (const product of selected) {
      await inventoryPage.addToCart(product.name);
    }

    await inventoryPage.openCart();

    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.itemNames).toHaveText(selected.map((p) => p.name));
    await expect(cartPage.itemPrices).toHaveText(selected.map((p) => p.price));
  });


});