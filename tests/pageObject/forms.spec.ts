import {test,expect} from '@playwright/test'
import { NavigationPage} from '../../pageObject/Navigation.page'

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200')
})

test('navigate to from page', async ({page}) => {
  const navigationPage = new NavigationPage(page)
  await navigationPage.formLayoutsPage()
})
