import { Page, expect } from "@playwright/test";
import { HelperBase } from "./Helper.page";

export class DatePickerPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async selectDateFromDatePicker(daysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();
    const dateToAssert = await this.selectDate(daysFromToday);

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }
  async selectDatepickerWithRange(startDate: number, endDate: number) {
    const calendarInputField = this.page.getByPlaceholder("Range Picker");
    await calendarInputField.click();
    const startDateToAssert = await this.selectDate(startDate);
    const endDateToAssert = await this.selectDate(endDate);
    const dateToAssert = `${startDateToAssert} - ${endDateToAssert}`;

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  private async selectDate(daysFromToday: number): Promise<any> {
    let date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShot = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }
    await this.page
      .locator('[class*="day-cell ng-star-inserted"]')
      .getByText(expectedDate, { exact: true })
      .click();
    return dateToAssert;
  }
}
