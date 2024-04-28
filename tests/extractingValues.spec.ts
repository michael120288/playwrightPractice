import {expect, test} from "@playwright/test"

test.beforeEach( async({page}) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click()
  await page.getByText('Form layouts').click()
})

// test('extracting values', async({page}) => {

//   //single test value
//   const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
//     const buttonText = await basicForm.locator('button').textContent()
//     expect(buttonText).toEqual('Submit')
//   //all text values
//   const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
//   expect(allRadioButtonsLabels).toContain('Option 1')

//   //input value
//   const emailField = basicForm.getByRole('textbox',{name:'Email'})
//   await emailField.fill('test@test.com')
//   const emailValue = await emailField.inputValue()
//   expect(emailValue).toEqual('test@test.com')

//   const placeHolderValue = await emailField.getAttribute('placeholder')
//   expect(placeHolderValue).toEqual('Email')
// })
test('extracting values', async({page}) => {

  //single test value
  const formElement = page.locator('nb-card').filter({hasText: 'Basic form'})
  const submitButtonText = await formElement.locator('button').textContent()
  expect(submitButtonText).toEqual('Submit')

  //all text values
  const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonLabels).toContain('Option 1')

  //input value
  const emailInputField = formElement.getByRole('textbox',{name:'Email'})
  await emailInputField.fill('test@test.com')
  const emailInputValue = await emailInputField.inputValue()
  expect(emailInputValue).toEqual('test@test.com')

  const emailPlaceholderValue = await emailInputField.getAttribute('placeholder')
  expect(emailPlaceholderValue).toEqual('Email')
})

/*
And in this lesson, we will learn how to extract different values from Dom.

For example, text values, values of the input fields or attribute values.

So let me start a new test for that.

And here is our test application.

So in the previous lesson, we worked with the basic form and let's say we want to get the text of this

button, submit button from the basic form and we want to validate that the button text on the basic

form is submit.

If I make a right click and inspect the element, we can see that yes, this is a submit text.

That is a text for the button on the basic form.

So how to get a single text value?

Let me take the.

Locator for the basic form as our starting point from the previous test.

I want to create a new constant and call it button text.

Then I want to grab the text from the button and assign this text into this context.

So I'm doing await basic form dot locator.

We're looking for the button and the way how we extract the text from the web element is using the method

text content.

That's it.

So playwright will take the text from this button and assign to the variable.

And right now we can make assertion.

Expect button text to equal.

Submit.

That's it.

So let's run this test.

We have a new test here and let me run it.

Okay, we can see test passed successfully.

So here is the step assertion passed.

And let's say if I change, submit to, let's say submit to and let me forcefully fail this test.

And test failed.

And because of the assertion we expected submit to but received as submit.

So we got the text assigned to the button text and then made a comparison of the button text constant

and value submit to.

And of course it's not equal.

Okay, so moving on, how to get all text values.

So let's look into this example.

So we have these radio buttons, right?

So one, two and one radio button is disabled.

So let's take all radio buttons and validate that at least one of the radio button should have the value

of option one.

So let's do something like this.

Await.

Page, dot locator and the locator for a radio button.

Right click inspect.

We have this and B radio one, two and three.

So so we can use NB radio.

And B radio.

And the way to get all the values we need to use all text contents.

Method and assign the result to a new constant const all radio buttons, labels, something like that.

And we can make assertion expect that all.

Radiobutton label to contain because we are looking for just one value.

Option one.

So using method, all text contents will grab all the values from the each of the element and put those

values in the form of the array.

And then we validating that this array contains option one.

So let me run it.

And this test passed.

Here we go.

And let me run it and feel, for example, option one, to run this test one more time and I will show

you how it's going to be fail.

Okay.

Test failed.

And look at what it says.

Received array option one, option two and disabled option.

So it grabbed for us all three values and we validating that option one is part of this array.

And since we provided option one to option one, two is not the part of this array.

That's why this test failed.

So changing back again.

So the next example how to find the value of the input field input value.

Remember I mentioned before that not all texts that you see on the page is actually a text.

Some of those are properties or just, you know, hidden values that are located in the properties.

A good example would be this If I type here, for example, test at test.com.

Right, and click enter.

We see that this text is displayed on the page, but if I make a right click and inspect, we don't

see this text actually inside of this input field.

So if you try to make a validation that this text should be displayed in this input field, or if you

try to get this text from the input field using method text content or all text contents, it will not

work.

You will need something different.

So let me start first with creating a locator for the email field.

I type const email field equals to basic form dot get by role text box with the name email.

And now we want to fill this email with the value email field field test@test.com.

And now let's make assertion of this value await email field and we want to first grab the value from

this input field and we use a method input value.

This is what you need to use and assign this result to a new constant const email value equals to email

field input value and we can make assertion expect email value.

To equal test at Test.com.

That's it.

Let's run it.

Yeah, this test passed successfully.

So one more time, if you want to grab a value from the web page, which is not a text, which is an

input field value, you need to use a method input value and it will return a text that is inside of

this input value.

And the last example, let's say we want to get the value of the attribute.

So looking one more time in our email input field, right click inspect and we can see we have a bunch

of different different attributes and sometimes those attributes changing their values based on the

state of the application.

And let's say we want to validate that this placeholder attribute has a value email, something like

that.

So how to grab this and make this validation constant, create a new constant for placeholder value

equals to await and I'll use the previously created locator, which is email field.

And I call a method get attribute.

And inside of the get attribute, I provide the attribute name that I want to get the value for and

the attribute name is Place Holder.

That's it.

And now I can make assertion expect placeholder value to equal email.

And running this test again.

Okay.

This passed successfully.

We see assertion was successful.

All right.

Let's quickly summarize what we did in this lesson.

If you want to grab a single text from the web page for your web element, you need to use method text

content.

If you want to grab all text elements for the list of the web elements.

In this example was Radiobuttons.

You need to use a method all text contents if you want to get the property value of the input fields,

for example, which is not a text, you need to use a method input value.

And if you want to get the value of any attributes on the web page, use method, get attribute and

as an argument, provide the name of the attribute and you will get the value of that particular attribute.
*/
