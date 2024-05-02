import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});


test('lists and dropdowns', async ({ page }) => {
  const dropDownMenu = page.locator('ngx-header nb-select')
  await dropDownMenu.click()

  page.getByRole('list') // when the list has a UL tag
  page.getByRole('listitem') // when the list has a LI tag


  //const optionList=page.getByRole('list').locator('nb-option')

  const optionList = page.locator('nb-option-list nb-option')
  await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
  await optionList.filter({hasText:'Cosmic'}).click()
  const header = page.locator('nb-layout-header')
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

  const colors = {
    'Light': 'rgb(255, 255, 255)',
    'Dark': 'rgb(34, 43, 69)',
    'Cosmic': 'rgb(50, 50, 89)',
    'Corporate': 'rgb(255, 255, 255)'
  }

  await dropDownMenu.click()
  for(const color in colors){
    await optionList.filter({hasText:color}).click()
    await expect(header).toHaveCSS('background-color', colors[color])
    if(color != 'Corporate'){
      await dropDownMenu.click()
    }
  }

})
