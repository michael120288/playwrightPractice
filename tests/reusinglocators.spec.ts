import {expect, test} from "@playwright/test"

test('My first test', async({page}) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click()
  await page.getByText('Form layouts').click()
})

test('Parent elements', async({page}) => {

  const basicForm = page.locator('nb-card').filter({hasText:'Basic form'})
  const emailField = basicForm.getByRole('textbox', {name:"Email"})

  await emailField.fill('test@test.com')
  await basicForm.getByRole('textbox', {name:"Password"}).fill('123456')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@test.com')
})
/*

And in this lesson I will show you how you can reuse locators in order to reduce copy pasting.

So let me start a new test.

So first, let's automate a simple scenario filling out the basic form.

So we have a basic form.

Let's type email password and click submit button, and then we will refactor it to look just a little

bit nicer.

So from what we learned so far, we can do this, so we can type.

This command and Picard basic form get by, roll email and instead of click we will use method fill

and type email test@test.com.

Then the next step we want to use the same basic form.

And instead of using email, we will use password and we will type welcome one, two, three.

And then again, we want to use exactly the same basic form.

And within this basic form, we want to find our button and click on that button, dot, click.

So first of all, let's make a quick run.

Yeah.

And successfully worked.

We have a username we type password and click was performed.

But if we go back to our code we see how a lot of duplication we have.

Right.

We have basic form this line repeated three times.

So in order to avoid this duplication, we can extract this locator into the constant and then use just

a reference to this locator.

So create a new constant.

Const and let me call it, for example.

Basic form equals.

And then I take this locator and assign to this constant.

Then instead of using this full locator, I just type basic form and replace a basic form to all three

instances.

So that's it.

We quickly reformatted our code, assign the locator to a basic form to a constant, and then we just

use this constant to call the child elements such as email password and click the button.

Run this test.

Yeah, and it works successfully.

Additionally, if you want, you can make another level of abstraction by creating a new constant using

the existing constants.

So I create a new constant.

And let's say I want to create the constant for the just email input field email.

Field equals to basic form dot and we get this get by role email and put it right here and now.

Instead of using this structure, I just put email field dot field test at test.com.

And it works perfectly fine.

So let's just make one more thing to complete our test basic form.

And within this basic form, let's say I want to click on the checkbox and this is the locator for the

checkbox is just a one checkbox for that particular form.

So this locator is unique for us.

Perform a click.

Run it again.

The click was performed.

And at the end of the good test, let's write our first assertion.

Await expects and in order to use expect, I need to import it here from the playwright library test

and expect.

Now I can use it expect and we expect that our email field.

To have value and the expected value is this one test at test.com and then run it again.

Test passed successfully.

Here is our assertion and assertion passed.

All right.

So let's quickly summarize what we did in this lesson.

If you want to reduce the duplication of your code, you can always reuse your locator, assigning them

to the constants.

So in this example, we assign the basic form to the basic form constant.

You can increase level of abstraction by reusing the already created constants, creating a new constants

like this.

And then later in the code, call this constant that represents a reference to your locator and find

the child elements.

And we perform a very first assertion, just the introduction to the assertion that the playwright and

we will talk more about assertion in the lessons to come.

*/
