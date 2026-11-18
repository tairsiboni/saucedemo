# Sauce Demo – Test Suite

Automated test suite for the 'Sauce Demo' site : https://www.saucedemo.com

## Prerequisites & SetUp
### Prerequisites

- [Node.js](https://nodejs.org) (LTS version)
- [Git](https://git-scm.com)

### Setup

```bash
git clone https://github.com/tairsiboni/saucedemo.git
cd saucedemo
npm install
npx playwright install
```

## Run the tests

### Run the whole suite (Chromium and Firefox, in parallel):
```bash for all test files
npx playwright test
```

```bash for login
npx playwright test tests/login.spec.ts
```


### Open the HTML report:
```bash
npx playwright show-report
```

## Project Structure

```
pages/        Page Objects – locators and actions for each page
test-data/    Test data – users, passwords and expected messages
tests/        Test files, one per feature area
```

## Design Decisions



## Assumptions



## What I Would Add With More Time



## Bug report

