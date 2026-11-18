import { Page, Locator } from '@playwright/test';

export const priceValue = (price: string): number => parseFloat(price.replace('$', ''));

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

//class and locators
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
  }

//actions
  async sortBy(option: SortOption) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    await this.itemNames.first().waitFor();
    return this.itemNames.allTextContents();
  }

  async getProductPrices(): Promise<string[]> {
    await this.itemPrices.first().waitFor();
    return this.itemPrices.allTextContents();
  }
  
}

