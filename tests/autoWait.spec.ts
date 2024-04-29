import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
});
test('autowaiting AJAX Request', async({page})=>{
  const button = page.locator('bg-success')
  await button.click()
})
test('autoWaiting AJAX Request', async({page})=>{
  const button = page.locator('bg-success')
  const text = await button.textContent()
  expect(text).toEqual('Data loaded with AJAX get request.')
})
test('autoWaiting AJAX Request with fail', async({page})=>{
  const button = page.locator('bg-success')
  const text = await button.allTextContents()
  expect(text).toEqual('Data loaded with AJAX get request.')
})

test('autoWaiting AJAX Request with pass', async({page})=>{
  const button = page.locator('bg-success')
  await button.waitFor({state: 'attached'})
  const text = await button.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
})

test('autoWaiting AJAX Request with fail (text)', async({page})=>{
  const button = page.locator('bg-success')

  expect(button).toHaveText('Data loaded with AJAX get request.')
})
test('autoWaiting AJAX Request with pass (text)', async({page})=>{
  const button = page.locator('bg-success')

  expect(button).toHaveText('Data loaded with AJAX get request.',{timeout: 20000})
})
test('alternative waits', async({page})=>{
  const button = page.locator('bg-success')
  //wait for element
  await page.waitForSelector('.bg-success')
  const text = await button.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
})
test('alternative waits 2', async({page})=>{
  const button = page.locator('bg-success')
  //waiting for particular response
  await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
  const text = await button.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
})
test('waiting for network calls to be complited', async({page})=>{
  const button = page.locator('bg-success')
  //waiting for particular response
  await page.waitForLoadState('networkidle')
  const text = await button.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
})
test('waiting for timeout', async({page})=>{
  const button = page.locator('bg-success')
  //waiting for timeout
  await page.waitForTimeout(5000)
  const text = await button.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
})

/*
And in this lesson we will talk about very important concept of the playwright, which is auto weighting.

It's very important to understand this concept very well to make sure that you write the reliable and

resilient test and reduce flakiness in your test.

So earlier we talked about the keyword await that you have to use every time when we work with the promises,

types of methods and promises, the type of the JavaScript function that can wait for the certain desired

condition up to the limit of the timeout.

And this concept is used by playwright to wait for the web elements to be available on the page and

interact with them so this happens automatically.

For example, Textcontent method is waiting for this basic form button to be available so it can take

the text from this button and then we can make assertion of this button.

Same for the click.

So click is also waiting for different conditions for this basic form button in order to perform the

click and the default timeout.

To wait for this condition is 30s, which can be configured and about the timeouts.

We will talk in the next lesson.

In this lesson we will talk just about the waiting concept.

So what are those conditions?

If I go to playwright documentation, here is the article Auto waiting and conditions that playwright

methods can wait for are attached visible stable receives event enabled and editable.

And here is the table of all those methods.

As you can see, not all methods wait for all the conditions.

For example click wait for attach visible stable, receive events and enable.

But for example method text content wait for only attach and if element is not visible for some reason

this method will be executed and also you can see that number of the commands that support auto waiting,

it's pretty limited.

For example, this list doesn't have the command that we already used.

This one all text content even.

It is a promise.

We see this is a promise type of the command.

This command will not wait for any condition.

It will just run the test.

And if some locator is not available or not visible at the time when this command is executed, this

will create a flaky and unstable test.

So and let me show you how to deal with auto waits and all those kind of conditions.

For that, we're going to use a different website to test.

This is a UI test playground.com and it has just a nice button which I click on this button.

It has a 15 seconds delay and after 50s we have a message data loaded with Ajax get request.

So we will try to interact with this button that have this text.

And using this example I will show you how playwright automatically waits for this button and for this

text to be available.

So for more convenience, I will create a new test file and call it auto waiting dot spec dot ts and

we'll set up a brand new.

Test suite.

So I made the import that I need a before each section in the before each I'm going to put my.

URL, Which is this one.

And also what we want to do is click on this button, right, inspect, and this is the text we want

to click Get by text instead of forms.

We will click on button Trigger an Ajax request.

We want to make it before every test and then the test itself.

So first thing, let's find the locator for the section of the success message that we want to interact

with.

So let's do this.

BG Success class.

And we create a new locator constant success button equals to page locator.bg success.

And now let's try to just simply click on this button success button, dot, click, and I will run

this test.

Playwright runner.

We have new test shows up, and I'm running this test.

So you can see right now playwright is trying to perform the click, but the button that we are waiting

for is not available yet and playwright patiently wait up to 30s for the success button to show up and

to perform a click.

Here we go button shows up after 15 seconds and click was performed.

We can see that this is successful if I will forcefully reduce the timeout.

So I go to my playwright config file and here in define config I will change the default timeout timeout

to.

10s, which is 10,000 milliseconds.

And I'm going back and running this test one more time.

Now we see that Click command is trying to access this button again.

And we can see the error message waiting for the locator.

Success and target closed.

So conditions of the click command were not satisfied Within the timeout of 10s it was trying to perform

the click on the button, but button was not available within 10s of the timeout.

That's why it's failed.

So let me show you something similar.

I will change this timeout.

Back to 30s.

And the second example is with text content, await success button text content and let's create a constant

const text.

Equals to We want to grab the text from this web element and then create assertion.

Expect text.

To equal.

Data loaded with Ajax get request.

So I comment out this line of code and run it one more time.

Running it again.

Yeah.

And you can see the same thing happens.

So text content is patiently waiting for this button to be available in order to grab the text from

the page and when it will be available, it will make this interaction and test is completed.

So you can see here this is the step that performed for 15 seconds and then we perform the assertion.

So this is how auto waiting works.

But let me show you a different example.

When we use not text content, when we try to use get all text contents, I will comment this code and

run it one more time.

And we can see that it is filled right away because all text content did not wait for the text to show

up.

We see expected data loaded with Ajax but received empty simply because all text content didn't wait.

And what we can do about it.

We can create additional wait for the methods like this which do not have implemented auto wait logic.

We can do something like await success button and we want to wait for a certain condition.

And let's say that we want to wait for a state which is attached, detach, hidden or visible.

We want to wait for state attached.

And if we run this test one more time.

Now you can see that playwright is waiting for this element to be attached first before performing all

text contents method to be executed.

Okay.

And what we see and this is an array, so we need to use a different assertion here.

So let's replace it with instead of two equal, we replace it to contain.

Run it it one more time.

And it is again waiting.

And this test passed right now successfully.

And here is one more example how the locator types of assertion will work without waiting.

So we expect that success button.

To half text and we look for this.

Text and we know that default timeout for the locator assertion is five seconds.

So this assertion should fail right now.

So let me comment out this code and I run only this part and this should fail.

In five seconds.

Timeout five seconds waiting for expect to have text expected so expect a string this but receive string.

Is this because this element was not visible within this timeout but we can override the timeout for

this method and let's say we use a timeout of 20s and let's run this one more time.

And right now it's passed.

So we increase the default timeout from five seconds to 20s and we know that our button will show up

in 15 seconds.

So timeout is more than the time that this button should show up and assertion passed.

And let me show you other alternative ways that you can use in playwright when you're dealing with the

commands such as alt text contents that do not have auto waiting feature implemented.

So this is the options that you have.

So let me create a new test and I will call it Alternative Waits.

We will use the same locator as our starting point and we will use these two lines of code as our example

of the method that do not have weight.

So something like this.

So what kind of weights you can use?

Example number one is weight for element, a page, wait for selector and you can provide the selector

that we want to wait for and we want to wait for our particular button.

Right?

That's it.

So let me run this alternative.

Wait.

And you can see that it is patiently waiting for this selector to be available based on our timeout.

And the test passed.

We got the text and made the assertion.

Okay.

Second example.

You can wait for particular response.

So what?

I mean, if we go back to the test application, usually all the information that we have on the web

page displayed coming from the back end server and this information coming from the API, the information

with interaction of the API located in this networking tab.

So if I refresh the page, click refresh, we can see that many things are happening here in the background.

So I click on the button and we can see that this Ajax data call is happening and we see the pending

status.

So this kind of a simulation of networking requests that we are waiting for.

And after 15 seconds we see the time, 15 seconds, we have a successful response and the response status

code of 3 or 4, and sometimes we can just wait for the API call to be completed as well.

So let's trigger this condition.

Await page wait for.

Response and we need to provide the URL of the response that we are waiting for.

Going back here, I click on this quest.

Click on headers and this is the URL that we are waiting for.

I just copy this URL, paste it here, comment out the previous line and right now playwright will wait

for this networking request to be successfully completed and only then we will go to the next step to

this line of code.

And here we go.

We can see that playwright is waiting right now for this network call.

And also this test passed successfully.

Okay.

What else you can do?

Wait for network calls to be completed.

And I would mark it as not recommended, but sometimes can be useful.

So you can use this type of wait to make sure that all API calls were completed for your application

and it is in completely loaded state.

And that way you can be assured that everything that should be loaded for your application is actually

loaded.

So what we can do is await page dot, wait for load state and you can provide the load state that we

waiting for.

For example, network is idle, so playwright will wait until all the API calls in the networking tab

of the browser will be completed and only then will move to the next line.

But again, this approach is not recommended because if some of the API calls is stuck, your test will

also be stuck at this point and some of those API calls may not be that really important for the functionality

of your application.

So be really careful about these types of wait and I'm running this one more time.

And you can see it also works fine.

We are in the line number 32.

We are waiting for the network to be idle.

And after 15 seconds.

It worked just fine.

Our test passed successfully.

And what are other types of weights that you can explore by yourself?

Page dot wait for.

So you can also wait for a particular event to be triggered.

You can wait for a function.

You can wait for the request.

So I already showed you an example of the certain response, but you can also wait for API request that

your browser send and you can wait just for the timeout itself.

So you can hardcode for example, wait for five seconds and it's hardcoded.

Wait, it's not recommended way of course, but still you can use this approach as well.

And what is left wait for and wait for the particular URL.

So this approach can be useful if you navigate to a particular page and you wait for this to be available.

So this is the alternative waits that you can use in the playwright when you're dealing with the commands

of the playwright.

They do not have automatic wait implemented.

All right, guys.

So let's quickly summarize what we did in this lesson.

Playwright has automatic waiting mechanism for the certain conditions to be satisfied, such as attached,

visible, stable, receive events enabled and editable.

And also playwright has a limited number of the methods that supports this outer waiting.

The list of this method you can find here in the playwright documentation.

This table provides the method name and what kind of conditions this method will automatically wait

on the page to be satisfied.

The duration of this wait is defined by the timeout settings.

If you interacting with the elements that do not support auto waiting, for example all text contents,

you can add additional wait to wait for a specific state or you can use alternative waits such as wait

for the selector, wait for the response and few others that you can choose that works best for you.

*/
