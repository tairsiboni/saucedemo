# Sauce Demo – Test Suite
Automated test suite for the 'Sauce Demo' site : https://www.saucedemo.com

## Prerequisites & SetUp
Prerequisites:
- [Node.js](https://nodejs.org) (LTS version)
- [Git](https://git-scm.com)

Setup:
git clone https://github.com/tairsiboni/saucedemo.git
cd saucedemo
npm install
npx playwright install


## Run the tests
1.login
cmd-
npx playwright test tests/login.spec.ts

2.sorting
cmd-
npx playwright test tests/sorting.spec.ts

3.cart
cmd-
npx playwright test tests/cart.spec.ts

4.e2e checkout
cmd-
npx playwright test tests/e2echeckout.spec.ts

5.failed checkout due to missing details in the checkout page
cmd-
npx playwright test tests/checkout-missingdetails.spec.ts

### Run the whole suite (Chromium and Firefox, in parallel):
cmd
npx playwright test

### Open the HTML report:
```bash
npx playwright show-report
```

## Project Structure
pages/        Page Objects – locators, class and actions(methods) for each page
test-data/    Test data – users, passwords, products-details and expected messages
tests/        Test files, one for each task.

## Design Decisions



## Assumptions
//all locators and data used in this suit are taken from the site itself.
//I took in considaration the all data apears on the site for the valid user is correct.
//tax rate is 8% taken from the site.


## What I Would Add With More Time



## Bug report

