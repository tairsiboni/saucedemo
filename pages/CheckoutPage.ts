import { Page, Locator } from '@playwright/test';

export const moneyFrom = (text: string): number => {
  const match = text.match(/\$(\d+\.\d{2})/);
  if (!match) throw new Error(`No price found in "${text}"`);
  return parseFloat(match[1]);
};

//class and locators

export class CheckoutPage {
  readonly page: Page;

  // Step one: your information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // Step two: overview
  readonly itemPrices: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  

  // Complete
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.errorMessage = page.getByTestId('error');

    this.itemPrices = page.getByTestId('inventory-item-price');
    this.itemTotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.completeHeader = page.getByTestId('complete-header');
  }


  
  //methods
  
  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async getItemPrices(): Promise<number[]> {
    await this.itemPrices.first().waitFor();
    const texts = await this.itemPrices.allTextContents();
    return texts.map(moneyFrom);
  }

  async getSummary() {
    return {
      itemTotal: moneyFrom(await this.itemTotalLabel.innerText()),
      tax: moneyFrom(await this.taxLabel.innerText()),
      total: moneyFrom(await this.totalLabel.innerText()),
    };
  }

  async finish() {
    await this.finishButton.click();
  }


  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

}
