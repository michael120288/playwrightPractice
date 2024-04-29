import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page },testInfo) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
  testInfo.setTimeout(testInfo.timeout + 2000)
});


test("Timeout test", async ({ page }) => {
  const button = page.locator('bg-success')
  await button.click()
})
test("Timeout test overwrite timeout", async ({ page }) => {
  const button = page.locator('bg-success')
  await button.click({timeout:16000})
})

test("Timeout test overwrite timeout by  setTimeout", async ({ page }) => {
  test.setTimeout(10000)
  const button = page.locator('bg-success')
  await button.click({timeout:16000})
})

test("Timeout test slow", async ({ page }) => {
  //If you mark your test with this command slow will increase the default timeout in three times to allow

//your test a little bit more time to continue the execution.
  test.slow()
  const button = page.locator('bg-success')
  await button.click({timeout:16000})
})


/*
And in this lesson we will talk about the timeout, which is how long playwright will wait for the certain

conditions, timeouts and playwright has three layer design and dependency.

So the outer layer is a global timeout.

Global timeout is the time limit of the whole test run.

It means that if you have multiple tests, let's say ten tests in your test suite, global timeout is

the total duration of the time for the entire test run execution.

If the global timeout, for example, set for two minutes and if your entire test suite runs longer

than two minutes, then the test will be terminated based on the timeout by default.

Global timeout is not configured and if you want to configure it, you absolutely can do this.

The next layer of the timeout is a test timeout, which is under a global timeout test.

Timeout is the time limit for a single test execution.

The default value for the timeout is 30s or 30,000 milliseconds and you can configure this value accordingly.

And inside of the test timeout there is a nested three other timeouts which is action timeout navigation

timeout and expect timeout action Timeout is the time limit for the action command to be executed.

For example, if we take the click command, the click command will wait for element to be available,

visible, clickable and so on up to the time of the test timeout because action timeout by default is

not configured.

If you will configure the action timeout, click for example, will wait up to the configuration timeout

of the action.

Timeout action timeout cannot be longer than the test timeout and test timeout cannot be longer than

a global timeout.

If you put for example action timeout of 40s but test timeout is configured as 30s, the actual action

timeout will be 30s because it will be limited by the layer of the test timeout and by default action

timeout is also not configured.

Navigation timeout the same thing.

Navigation timeout is how long playwright will navigate to the certain page and load this page.

This timeout is also not configured by default and limited by the test timeout.

And the third timeout is expect timeout.

Expect timeout is the time limit for expect locator assertions.

The default value is five seconds and I remind you that only locator assertions has a timeout because

the generic assertion or general assertion they don't have timeout and they don't wait for anything.

So again expect timeout cannot be configured longer than a test timeout because the higher level timeout

has higher priority.

So and let me show you those timeouts and configuration based on example.

So we're going back to our application to the previous outer waiting dot spec and let me create a new

test just for the demonstration of the timeouts.

So I will take the example from the previous lesson, just this locator and click on our success button.

This will be our demo.

So await success.

Button.

Click.

So according to the default configuration, if we run this test, it should pass because the default

test timeout is 30s and we know that click on this button takes 15 seconds for the button to show up

and let me run this test.

So I open a test explorer and we'll run the test just in the headless mode because we don't need to

open the browser.

We know what's going on there.

So I'm running the test and we can see that right now.

Click Command is waiting for our success button to show up in order to click on it.

And here we go.

After the 15 seconds, the button showed up and we know that default test timeout is 30s.

So our test was executed within a timeout limit of the test, but if we configure the timeout below

the 15 seconds, our test should fail.

There are different ways how you can configure timeouts.

One of the way is using playwright dot config dot ts.

So inside of the define config you can type a timeout and define the global settings for the timeout.

So let's say we put 10s which is 10,000 milliseconds and I'm running this test one more time.

So click command is waiting.

And it is filled with the error message that Target is closed because we reached the limit of the test

timeout.

And you can see that this happened after 9.5 seconds.

So this step probably took half a second and the rest is 9.5 seconds to execute a click timeout.

Also, you can configure other timeouts inside of the defined config.

For example, to configure global timeout, you can type global timeout colon and configure global timeout.

Let's say for example, we put 60s which is one minute for the global timeout and to configure other

types of timeouts such as action, timeout and navigation timeout, we need to use this block in the

config file which is use and we can type here action timeout.

And let's put for example five seconds for the action timeout and navigation timeout five seconds as

well.

So I going back to our test timeout and increase it to let's say 40s.

And right now our execution will be limited by the action timeout, which is defined by five seconds.

So if I run this test one more time right now, it will fail because we limit it.

How long the action command will wait for the element to be available.

So let me run this one more time.

Test is running.

We see that click is waiting for our command.

And it failed.

And look, the error message right now look different timeout five seconds exceeded.

So locator clique was not able to find the element because of the timeout of five seconds that we configured

for this particular action command.

You can always override the timeout for the action by providing the timeout inside of the command.

And for example, we want to provide a timeout for this particular click of, let's say, 16 seconds.

We know that this element should show up within 15 seconds, so timeout of 16 seconds will be enough

and this action timeout setting will override the action timeout that we configured in the playwright

config.

So let me run this.

And right now this test should pass.

Yeah.

And you see test passed successfully.

15.5 seconds took for the click to access this button.

So what else can we do?

So let's say I remove this action timeout from here.

Our test timeout is 40s.

So if you want to override the test timeout for a particular test, you type test set timeout and provide

the value.

So let's say if we put a 10s we will fail this test.

I will remove timeout from here, but even if I keep this timeout it will not work because our test

timeout is lower than a command timeout.

And by the way, I can demonstrate you right now how it's going to fail.

Our clique is waiting.

Yeah.

And test failed.

And test failed is because our test timeout is just 10s.

But button to show out is 15 seconds.

So let me remove this from here.

Also, let's say you know that you have a slow test that is flaky and you want to increase the timeout

just for this particular test.

And playwright has a command test dot slow.

If you mark your test with this command slow will increase the default timeout in three times to allow

your test a little bit more time to continue the execution.

For example, I change this timeout to just 10s but this test dot slow multiply that 10s by three so

it will be 30s.

So this test should pass.

I'm running it one more time.

You see the sparse successfully.

It worked.

And one more setting.

So let's say you want to modify the test timeout for a particular test suite.

You can do it using a beforeeach hook.

So inside of the before each hook, you need to provide the second argument, which is test info and

then you can type like test info, dot set timeout and then you can take the test info, object the

existing default time value and increase.

Let's say this time value for two seconds.

And this will modify the default timeout for plus two seconds and it will be applied for every test

in this particular test suite.

This is another option how you can override the timeout values.

And the very last thing for the expected timeout for locator assertions, If you want to override,

expect timeout for locator assertion, you can add it into the settings as well.

So you can type expect and provide the object with the value of the timeout timeout.

And let's say instead of five seconds, we want to use, let's say two seconds timeout for our locator

assertion and it will work like that.

And in the previous lesson I already showed you how you can override the particular expect timeout by

just providing a timeout inside of the assertion.

So that's it guys.

So let me quickly summarize what we did in this lesson.

Playwright has global timeout test timeout and different action navigation timeouts action navigation

and expect timeouts are within test timeout and test timeout within a global timeout.

Only test timeout has a default configuration of 30s and expect timeout has default configuration of

five seconds.

The rest of the timeouts are not configured by default.

You can configure timeouts globally for the framework in the configuration object of the playwright.

Define a timeout for the test.

Global timeout.

Expect timeout navigation timeout and action timeout.

Also, you can override the settings defined in the config object by providing them directly inside

of the test.

You can set the settings for the particular test for the timeout or the particular action command that

you want to override the waiting time.
*/
