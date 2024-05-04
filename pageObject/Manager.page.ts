import { Page, expect } from "@playwright/test";

import { NavigationPage} from '../pageObject/Navigation.page'
import {FormLayoutsPage} from '../pageObject/Layout.page'
import { DatePickerPage } from '../pageObject/DatePicker.page'

export class PageNavigationManager {

  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutsPage: FormLayoutsPage;
  private readonly datePickerPage: DatePickerPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutsPage = new FormLayoutsPage(this.page);
    this.datePickerPage = new DatePickerPage(this.page);
  }

  navigateToClass(){
    return this.navigationPage;
  }

  formLayoutPageClass(){

    return this.formLayoutsPage;
  }

  datePickerPageClass(){
    return this.datePickerPage;
  }

}