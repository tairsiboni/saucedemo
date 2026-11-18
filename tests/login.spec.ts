// This is a test file for the login functionality in the LOGIN page.

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users, loginErrors } from '../test-data/users';

 test.describe('Login functionality tests', () => {
  let loginPage: LoginPage;

 test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });


  
// successful login - valid credentials

test('login with valid credentials lands on the products page.', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });


 // negative tests - invalid credentials

test('login with invalid credentials show the correct error message', async ({ page }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);

    await expect(loginPage.errorMessage).toHaveText(loginErrors.invalidCredentials);
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

test('login with locked_out_user shows the locked-out error message', async ({ page }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(loginPage.errorMessage).toHaveText(loginErrors.lockedOutUser);
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

// empty fields
  test('empty username shows "Username is required"', async () => {
    await loginPage.login('', users.standard.password);

    await expect(loginPage.errorMessage).toHaveText(loginErrors.usernameRequired);
  });

  test('empty password shows "Password is required"', async () => {
    await loginPage.login(users.standard.username, '');

    await expect(loginPage.errorMessage).toHaveText(loginErrors.passwordRequired);
  });

  test('empty username and password shows "Username is required"', async () => {
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toHaveText(loginErrors.usernameRequired);
  });

});