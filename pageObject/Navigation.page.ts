import {Page} from '@playwright/test';

export class NavigationPage{
  readonly page: Page

  constructor(page: Page) {
    this.page = page;
  }

  async formLayoutsPage(){
    await this.selectGroupMenuItem('Forms')
    //await this.page.getByText('Forms').click()
    await this.page.getByText('Form Layouts').click()
  }

  async datePickerPage(){
    await this.selectGroupMenuItem('Forms')

    //await this.page.getByText('Forms').click()
    await this.page.getByText('Datepicker').click()
  }

  async smartTablePage(){
    await this.selectGroupMenuItem('Table & Data')

    //await this.page.getByText('Tables & Data').click()
    await this.page.getByText('Smart Table').click()
  }

  async toastrPage(){
    await this.selectGroupMenuItem('Modal & Overlays')

    //await this.page.getByText('Modals & Overlays').click()
    await this.page.getByText('Toastr').click()
  }
  async tooltipPage(){
    await this.selectGroupMenuItem('Modal & Overlays')

    //await this.page.getByText('Modals & Overlays').click()
    await this.page.getByText('Tooltip').click()
  }
  private async selectGroupMenuItem(groupItemTitle:string){
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expendedState = await groupMenuItem.getAttribute('aria-expanded')
    if(expendedState == 'false'){
      await groupMenuItem.click()
    }
  }
}
