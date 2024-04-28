import { test } from "@playwright/test";

test.afterAll(async () => {
  console.log("Done with tests");
  // ...
});
test.afterEach(async ({ page }) => {
  console.log("afterEach tests");
});

test.beforeAll(async () => {
  console.log("Before tests");
});

test.beforeEach(async () => {
  console.log("beforeEach tests");
});

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
  await page.getByText("Forms").click();
});

// test('My first test', async({page}) => {
//   await page.goto('http://localhost:4200')
//   await page.getByText('Forms').click()
//   await page.getByText('Form layouts').click()
// })

// test('Navigate to the datepicker page', async({page}) => {
//   await page.goto('http://localhost:4200')
//   await page.getByText('Forms').click()
//   await page.getByText('Datepicker').click()
// })

test("My first test", async ({ page }) => {
  await page.getByText("Form layouts").click();
});

test("Navigate to the datepicker page", async ({ page }) => {
  await page.getByText("Datepicker").click();
});

///////////

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("suite1", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Charts").click();
  });
  test("first test", async ({ page }) => {
    await page.getByText("Form Layout").click();
  });
  test("navigate to datepicker page", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});
test.describe("suite2", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });
  test("first test", async ({ page }) => {
    await page.getByText("Form Layout").click();
  });
  test("navigate to datepicker page", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});

//
// So what is a promise?

// In a few words?

// Promise is a type of the JavaScript method that can return two types of the results.

// It can be successful result or unsuccessful result when result is successful.

// Promise considered as a result and provide the result of the execution if it was not successful, promise

// returned the error message also the one of the definition of promises that it has a timeout of the execution.

// So promise can wait for the successful execution.

// And if we try to run the command like that, what happens?

// Playwright or JavaScript?

// It just doesn't wait for the promise to be executed and trying to run forward and we face it with is

// called a race condition.

// So for us, in order for this code to work, we need promise to wait until it's going to be resolved

// and we need to use a keyword await.
