// This is a test file for the sorting functionality in the INVENTORY page.

import { test, expect } from '@playwright/test';
import { InventoryPage, priceValue } from '../pages/InventoryPage'; 
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('Product sorting', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.title).toHaveText('Products');

     });

// sorting tests by name (A-Z and Z-A)- here i test first the Z-A sorting and then the A-Z sorting (since A-Z is the default sorting option, so I need to first change it to Z-A and then back to A-Z)
test('sorting by name Z to A orders products in reverse alphabetical order', async () => {
    const names = await inventoryPage.getProductNames();
    const expected = [...names].sort((a, b) => b.localeCompare(a));

    await inventoryPage.sortBy('za');

    await expect(inventoryPage.itemNames).toHaveText(expected);
  });

 test('sorting by name A to Z orders products alphabetically', async () => {
    const names = await inventoryPage.getProductNames();
    const expected = [...names].sort((a, b) => a.localeCompare(b));

    await inventoryPage.sortBy('az');

    await expect(inventoryPage.itemNames).toHaveText(expected);
  });

  
// sorting tests by price (low to high and high to low)

test('sorting by price low to high orders products from cheapest', async () => {
    const prices = await inventoryPage.getProductPrices();
    const expected = [...prices].sort((a, b) => priceValue(a) - priceValue(b));

    await inventoryPage.sortBy('lohi');

    await expect(inventoryPage.itemPrices).toHaveText(expected);
  });

test('sorting by price high to low orders products from most expensive', async () => {
    const prices = await inventoryPage.getProductPrices();
    const expected = [...prices].sort((a, b) => priceValue(b) - priceValue(a));

    await inventoryPage.sortBy('hilo');

    await expect(inventoryPage.itemPrices).toHaveText(expected);
  });


 });
