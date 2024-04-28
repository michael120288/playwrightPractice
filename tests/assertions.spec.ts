import {expect, test} from "@playwright/test"

test.beforeEach( async({page}) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click()
  await page.getByText('Form layouts').click()
})
test('verifying assertions', async({page}) => {
  const formButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')

  const buttonText = await formButton.textContent()
  expect(buttonText).toEqual('Submit')

  await expect(formButton).toHaveText('Submit')

  //soft assertion
  await expect.soft(formButton).toHaveText('Submit5')
  await formButton.click()
})
/*
So in the previous lessons we already used the assertions.

So here, for example, we validated the email input field has test at test.com and here we made other

assertions of the submit option one and so on.

But you probably noticed the difference that here we used await, expect something to have value, something,

but later we didn't use await keyword for our assertion.

So what's the difference and the difference between different types of the assertions of the playwright?

And I will show you those differences in this lesson.

So let me start a new test.

So playwright has two different types of the assertions, general assertions and locator assertions.

So let me start first with general assertions, and we begin with very simple example.

Let's say I create a new constant

value equals to five, and then I want to assert that expect value to equal five.

And let me run this test real quick.

Sessions run it.

Let's open the browser and here we go.

This is the assertions.

Expect value to equal five.

If I change it to expected result to six and run it.

And it's definitely failed.

We see that expected six but received value five which is expected.

So general assertion logic is very simple.

We compare value on the left to the value on the right and the methods that are available to make a

validation are very different.

You can look in the list of this method by just typing dot and here is the list of all possible assertions.

For example, to be to be close to less than equal to to be null.

To be truthy to be defined to contain is when you have a list of values and you want to make sure that

the list has the value that you have to equal to have length and so on.

And look at the small annotation next to it.

It says generic assertions.

So the provided list we see only generic assertions.

Generic assertions are very straightforward inside of the expect method.

You provide the argument that you want to assert and on the right you choose the method and provides

your expectation and that's all it does.

So let's make an assertion for, for example.

The basic form here.

So we make assertion for the submit button so we can take the previous example.

This basic form.

Let me paste it here.

Locator

button.

And it will be basic form button.

Okay.

And now let's make assertion that this basic form button has text submit.

In order to do that, we need first to get this text from the button equals to basic form button text

content, and then we can make assertion.

Expect text to equal submit.

I run this test.

And this didn't work.

Received empty to expected submit.

So let's take a look and okay.

We forgot to put a wait here so the text content will wait for the web element, get the text and then

run submit.

Run it again.

And now it's past successfully text content to equal submit.

So here is the example how easy you can make a mistake.

Right?

So I forgot to put the await and it didn't work.

So keep an eye on this thing and if something doesn't work in your code, always the first thing check

if you put await everywhere where it should.

So and it worked.

So one more time, we took the button, we took the text from this button, assigned it to the constant

and executed the general assertion to validate the text submit.

So now let's do the same using a locator assertion.

And what is the different for the locator assertion?

We also use expect, but instead of providing the exact value inside of the expect.

In this example, we use text which had the exact value we will provide.

A locator locator is basic form here and if I click dot now I have more assertions to be available.

For example, to be attached.

You can see this is a locator assertion or to be checked.

This is also located assertion or to not to be to be empty locator assertion and so on.

So now we have a list of generic assertion to be false and to be focused is a locator assertion.

And in the list of these assertions we can find a assertion that has to have property to have text.

Here we go.

This is what we are looking for, to have text and we validate what kind of text we are looking for

and we're looking for text submit.

And because this is a locator assertion, we need to provide a weight in front of the expect.

So what will happen here to have text method will search for the text inside of this web element and

when it finds the expected text, it will make an assertion and also locator assertions has their own

timeout.

So when you use the await, expect and locator assertion, this type of assertion will wait up to five

seconds for the element to be available.

While the general assertions will not wait any, it will be just executed when it is time.

In the sequence of the commands of execution, locator assertions will always wait and we will talk

more about outer waiting in the next lesson.

And another type of the assertion that you can use is soft assertion.

Soft assertion.

Soft assertion is a kind of the assertion when the test can be continue the execution even if the assertion

is failed.

For example, I will type await expect dot soft.

Then we provide the basic form button.

And then to have text.

Submit.

And let's say after this assertion, we want to click on the button await.

Basic button dot click with the soft assertion.

If we will fail this test, for example, we put submit five.

Right?

So this assertion should fail.

But despite that, the test will continue and still we'll click the button.

Let me show you that.

So I run this test.

We see a weighting of five seconds.

And it failed.

So we clearly see the failure message that received event was submit, but expected was submit five.

But at the same time, the playwright click on the submit button as a next text.

If I will remove a soft assertion and try to run this test again.

It's waiting for five seconds again.

And test failed and it's done.

Test did not continue the execution.

Playwright did not click on the next step, which is click button for the basic form.

So this is the difference between soft assertion and regular assertion.

Keep in mind that using soft assertion considered not a really good practice, but still, if you want

to continue running your test after certain validation is failed in order to catch other possible validations

within this test, run and analyze it, you can use a soft assertions.

All right.

So let's quickly summarize what we did in this lesson.

Playwright has two types of assertion, general assertions and locator assertions.

General assertions are very simple.

You just provide expect with the value that you want to assert and the desired method with the expectation.

General assertions will not wait for any conditions.

It simply perform the assertion when it's time to execute this particular line of code locator assertion.

Instead, they are a little bit smarter.

They can interact with the web elements and the methods of the locator assertions will wait up to five

seconds for the element to be available.

To make an assertion, to make a soft assertion, you just need to add dot soft.

In this case, your test will not fail and continue to run if assertion has failed.
*/
