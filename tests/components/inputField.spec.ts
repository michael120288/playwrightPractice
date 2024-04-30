import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("layout page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });
  test("should first", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("michael@test.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("michael@test.com", {
      delay: 100,
    });

    //generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("michael@test.com");

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("michael1@test.com");
  });
});
/*

And we begin beginning a new section talking about UI components.

And let me create a new spec file for that test.

New file.

Components.

Dot spec dot ts.

And let me quickly set this up.

So I need to copy the import.

Then I need to create a before test.

Hook.

Test before each.

And here we will navigate to our test application await page.

Go to.

Then I create a new test suite for the form's layout page test.

Describe.

And inside of form layout page.

I will create another before each test.

Before each where we will navigate to the Form Layouts page.

And now I'll copy those steps from here.

From the previous lesson.

And create a new test.

All right.

The initial setup is ready.

So let's go to our test application.

Here's the test application.

We have the form layouts page.

And using the grid is one of the form.

So let's for example type something in this email input field.

And I will show you how to do this in the playwright.

So first thing we need to write the locator for this email input field and create a new constant using

the grid.

Email.

Input equals to page dot locator.

So this is what this is NB card.

We already know this from the previous lesson.

This NB card has a descending text.

Has text.

Using the grid.

And we want to find a child.

Element by role.

Get by role, which is a.

Box.

With a name.

Email.

Okay.

That's it.

So let me make it wider.

Okay.

So this is our locator.

And here email with the capital E email exactly how the text is displayed right here inside of the input

field.

All right.

And let's type something into this input field.

And I use command await.

Call my locator using the grid.

And in order to type something into the input field in playwright you need to use a method field.

And inside of the method field, provide the argument with the text that we want to type.

For example, test at Test.com.

And let's quickly run this to see how it works.

Around this test.

And as you can see, we successfully typed the message into the input field.

If you want to clear the message from the input field, you need to call your locator again and wait.

Using the grid email input and call a method clear, and the message that you typed on the previous

step will be cleared.

So let me run it one more time.

And you see the message was cleared successfully.

Unfortunately, in the playwright, you cannot chain the clear command after the field command.

So if you type something like clear, this unfortunately will not work.

So in order to clear the message, you need to call your locator one more time and then call method

clear and another method that you can use to fill out the input field if you want to simulate the keystrokes

of the keyboard.

It's a weight using input field and you call a method, press sequentially and then type the message.

For example, we want to type a little bit different message text to add test.com.

Let me run it one more time.

And now you can see test two at test.com was printed inside of the input field.

And what also this press sequentially method can do is to create a delay between the keystrokes.

If for some reason in your test scenario you want to simulate like slower typing into the input field,

you can simulate that as well.

You need to provide a second argument with the object delay and type the amount in milliseconds.

How long you want to delay between the keystrokes.

For example, I want to type half a second and if I run this one more time.

You can see that right now it's typing really, really slow, simulating the key strokes.

All right.

That worked fine.

And let's talk about the assertions how to make assertions of the input field if you want to use a generic

assertion.

Then you first need to grab the text from the input field.

And let's take this text and assign to the constant.

Const input value, for example.

Then we call our locator await using the grid and we need to call a method input value.

So method input value will extract the text from the input field and we'll save into the constant.

And now you can use a generic assertion to perform the assertion of this input value.

Expect input value to equal.

And the value that we expect is this one.

Test 2@test.com.

And let me run this test.

And test passed successfully.

And the second example, if you would like to use a locator assertion, it would be a little bit different.

Locator.

Assertion.

And we type a wait expect we provide the locator which is using the grid.

And then we call a method to have value, not the text.

To have text will not work for the input field.

We need to use to have value method and type the expected text that we want to see as a value.

And that's it.

Let me run this test.

And test passed successfully.

All right that's it guys.

So let me quickly summarize what we did in this lesson.

In order to type any text into the input fields, you need to use method fill and provide the argument

as a string.

What you want to type into this input field.

In order to clear the input field, you need to use method clear that have to be called from the locator.

If you want to simulate a keystrokes on the keyboard, you can use method press sequentially and if

you want to simulate delays between the keystroke, you can pass additional argument providing the amount

in milliseconds.

How long do you want to delay a keystrokes?

Also, for generic assertion, you need to use a method input value that will extract the value from

the locator from the input field and assign to the constant or variable.

And then you can call generic assertion to perform the validations.

If you use a locator assertion, you provide the locator and use a method to have value.

Assigning the value inside of the input field.

*/
