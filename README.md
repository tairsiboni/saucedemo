# Sauce Demo – Test Suite
Automated test suite for the 'Sauce Demo' site : https://www.saucedemo.com

## Prerequisites & SetUp
Prerequisites:
- [Node.js](https://nodejs.org) (LTS version)
- [Git](https://git-scm.com)
- Browsers: Chromium and Firefox

Setup:
```bash
git clone https://github.com/tairsiboni/saucedemo.git
cd saucedemo
npm install
npx playwright install
```


## Run the tests
Run the whole suite (Chromium and Firefox, in parallel):
```bash
npx playwright test
```
By Tasks:
1.login
```bash
npx playwright test tests/login.spec.ts
```

2.sorting
```bash
npx playwright test tests/sorting.spec.ts
```

3.cart
```bash
npx playwright test tests/cart.spec.ts
```

4.e2e checkout
```bash
npx playwright test tests/e2echeckout.spec.ts
```

5.failed checkout due to missing details in the checkout page
```bash
npx playwright test tests/checkout-missingdetails.spec.ts
```

Other useful commands:

| Command | What it does |
|---|---|
| `npx playwright test --project=chromium` | Run on one browser only |
| `npx playwright test tests/cart.spec.ts` | Run one test file |
| `npx playwright test --headed` | Run with a visible browser window |
| `npx playwright test --ui` | Open Playwright UI mode to run and debug tests step by step |


## Open the HTML report
```bash
npx playwright show-report
```
The HTML report shows every test and its steps. Failed tests include a screenshot, and on CI retries also a trace.

## CI
The suite can run manually (fully) from the **Actions** tab (**Run workflow**). 
The HTML report is uploaded as an artifact named `playwright-report` on every run.


## Project Structure
```
pages/        Page Objects – locators, class and actions(methods) for each page
test-data/    Test data – users, passwords, products-details and expected messages
tests/        Test files, one for each task.
```

## Design Decisions
- **Page Object Model.** Each page has its own class with its locators and actions. Tests describe behavior and never use locators directly, so a UI change is fixed in one place.
- **`data-test` locators.** The site marks its elements with `data-test` attributes, so I set `testIdAttribute: 'data-test'` in the config and used `getByTestId()`. These locators don't depend on CSS classes or page structure, so they are the most stable choice.
- **Products found by name.** Instead of one locator per "Add to cart" button, `addToCart(productName)` finds the product card by its name and clicks the button inside it. One method works for every product.
- **Test data outside the tests.** Users, products, customer details and expected messages live in `test-data/`, so changing data doesn't mean changing test code.
- **No hard-coded waits.** The suite relies on Playwright's auto-waiting and web-first assertions (`toHaveText`, `toHaveURL`), which retry until the condition is met.
- **Independent tests.** Each test gets a fresh browser context and sets up its own state in `beforeEach`, so tests can run alone, in any order and in parallel (`fullyParallel: true`).
- **Expected values are calculated, not copied from the page.** The sorting tests sort the product list in code and compare it with the page. The checkout test sums the item prices and calculates the tax itself.
- **Money compared in cents.** Floating-point math can give results like `0.1 + 0.2 = 0.300000000004`, so amounts are converted to whole cents before comparing.
- **Data-driven validation tests.** The checkout validation cases are a list of inputs and expected errors, with one test generated per case. A new case is one new line.
- **`test.step` in the E2E test.** The long checkout flow is split into separate named steps, so the report shows exactly which step failed.


## Use of AI Tools
I used Claude (an AI assistant) to learn Playwright and TypeScript syntax, since my previous automation experience is with Selenium and Java. The test design, the choice of test cases, and the review of every file are my own.

## Assumptions
- All locators and data used in this suite are taken from the site itself.
- `standard_user` represents the correct, expected behavior of the site. All main tests use this user.
- The test-users, passwords and each user's expected behavior are taken from the assignment. 
- The site is a third-party demo, so the tests assume it is available and reachable. If it is down, the tests will fail without a real bug.
- The tax rate is 8% of the item total, rounded to the nearest cent. The site doesn't show the rate, so I calculated it from the item total and the tax on the overview page.
- Product names, prices and messages are compared as exact texts. If the site changes their wording, the tests will fail.
- The site keeps the cart in the browser, so every test starts with an empty cart, because each test gets a fresh browser context.

## What I Would Add With More Time
- Tests for `problem_user` and `performance_glitch_user`.
- Add more test cases (for valid user) that will also cover the side menu and all other pages from there.
- Add well explained report (with detailed structure, %pass, %fail etc.) that can be sent also via mail to the runner's email.
- Add bugs detections with "failed" reports.
- Add performance test (page-loading time, response time)
- UI testing (visability of elements)


