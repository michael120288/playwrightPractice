import {test} from "@playwright/test"

test('My first test', async({page}) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click()
  await page.getByText('Form layouts').click()
})

test('Child elements', async({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()


  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  await page.locator('nb-card').getByRole('button', {name:'Sign in'}).first().click()
  //try to avoid using nth element
  await page.locator('nb-card').nth(3).getByRole('button').click()
})
