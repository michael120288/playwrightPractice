import { Page, Locator } from "@playwright/test";
import { HelperBase } from "./Helper.page";

export class NavigationPage extends HelperBase {
  readonly fromLayoutsMenuItem: Locator;
  readonly datePickerMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly toastrMenuItem: Locator;
  readonly tooltipMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    this.fromLayoutsMenuItem = this.page.getByText("Form Layouts");
    this.datePickerMenuItem = page.getByText("Datepicker");
    this.smartTableMenuItem = page.getByText("Smart Table");
    this.toastrMenuItem = page.getByText("Toastr");
    this.tooltipMenuItem = page.getByText("Tooltip");
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    //await this.page.getByText('Forms').click()
    //await this.page.getByText('Form Layouts').click()
    await this.fromLayoutsMenuItem.click();
    await this.waitForNumberOfSeconds(2);
  }

  async datePickerPage() {
    await this.selectGroupMenuItem("Forms");

    //await this.page.getByText('Forms').click()
    //await this.page.getByText('Datepicker').click()
    await this.datePickerMenuItem.click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");

    //await this.page.getByText('Tables & Data').click()
    //await this.page.getByText('Smart Table').click()
    await this.smartTableMenuItem.click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");

    //await this.page.getByText('Modals & Overlays').click()
    //await this.page.getByText('Toastr').click()
    await this.toastrMenuItem.click();
  }
  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");

    //await this.page.getByText('Modals & Overlays').click()
    //await this.page.getByText('Tooltip').click()
    await this.tooltipMenuItem.click();
  }
  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expendedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expendedState == "false") {
      await groupMenuItem.click();
    }
  }
}
