import {test} from "@playwright/test"

test('My first test', async({page}) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click()
  await page.getByText('Form layouts').click()
})

test('Facing locators', async({page}) => {
  await page.getByRole('textbox',{name:'Email'}).first().click()
  await page.getByRole('button',{name:'Sign in'}).first().click()

  await page.getByLabel('Email').click()

  await page.getByPlaceholder('Jane Doe').click()

  await page.getByAltText('Using the Grid').click()

  await page.getByTitle('IoT Dashboard').click()

  await page.getByTestId('SignIn').click()
})
