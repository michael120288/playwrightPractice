import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("Modal & Overlays", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();
  });
  test("checkboxes", async ({ page }) => {
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .uncheck({ force: true });
    await page
      .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
      .check({ force: true });

    const allBoxes = page.getByRole("checkbox");
    for (const box of await allBoxes.all()) {
      await box.check({ force: true });
      expect(await box.isChecked()).toBeTruthy();
    }
  });
});
