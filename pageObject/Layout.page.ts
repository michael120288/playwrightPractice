import {Page} from '@playwright/test';
import { HelperBase } from './helper.page';

export class FormLayoutsPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async submitInlineForm(email:string, password:string,optionText: string){
    const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
    await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
    await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
    await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
    await usingTheGridForm.getByRole('button').click()

  }
  /**
   * @param name - should be a user name
   * @param email - add a valid email
   * @param rememberMe - true or false if user wants to be remembered
   */
  async sumbitInlineForm(name:string, email:string,rememberMe:boolean){
    const basicForm = this.page.locator('nb-card', {hasText: 'Inline form'})
    await basicForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
    await basicForm.getByRole('textbox', {name: 'Email'}).fill(email)
    if(rememberMe)
      await basicForm.getByRole('checkbox').check({force: true})
    await basicForm.getByRole('button').click()
  }
}