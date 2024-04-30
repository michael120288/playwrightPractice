import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("layout page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });
  test("radio buttons", async ({ page }) => {
    const usingTheGridForm = page
      .locator("nb-card", { hasText: "Using the Grid" })

      //await usingTheGridForm.getByLabel("option 1").check({force: true})

      await usingTheGridForm.getByRole('radio', {name:"option 1"}).check({force: true})
      const radioStatus = await usingTheGridForm.getByRole('radio', {name:"option 1"}).isChecked()
      expect(radioStatus).toBeTruthy();
      await expect(usingTheGridForm.getByRole('radio', {name:"Option 1"})).toBeChecked();

      await usingTheGridForm.getByRole('radio', {name:"Option 2"}).check({force: true})
      expect(await usingTheGridForm.getByRole('radio', {name:"Option 1"}).isChecked()).toBeFalsy()
      expect(await usingTheGridForm.getByRole('radio', {name:"Option 2"}).isChecked()).toBeTruthy()

    });
});

/*
And in this lesson we will talk about radio buttons.

So going back to our test application, here is our using the grid form.

And inside of this form we have two radio buttons.

So let's find out how to select those.

So I will create a new test.

And first thing that I will need is the locator for using the grid form.

I will take the half of this locator and will rename it using the grid form.

And now we need to locate the radio buttons to select the radio buttons.

What kind of the options for the locators we have?

Right click, inspect and look at this button.

So radio button is this input field input, which is type radio.

It is visually hidden.

We need to point attention to this class.

I will show you later why.

And also we have a span with text option one, which is the name for our radio button, and all this

is wrapped into a label tag so we can select this element by label as well.

And we have three radio buttons.

One, two, three.

If we open up inside of it is a label and inside of the label is input field.

So we can select this radio button by label and by role as a radio button.

Let me show you that.

So I type.

Await using the grid form.

And let's say first we selected by label.

So we just provide the name of this label, which is option Space one, and we use a method called check.

This is method is used to select the radio buttons, but for us it will not work as is because our input

field for the radio button in this particular application marked as visually hidden.

I don't know why developers decided to go that way, but because it is visually hidden, the check command

will not pass.

The default check, such as the element should be visible, clickable and so on.

So playwright will not be able to select this element.

And in order to bypass this validation of the availability, we need to pass the parameter force.

True, by providing the force, true, we disabling the verification of different statuses that check

command is waiting for.

So we're just literally clicking on this input field or we are checking this input field and let me

run this.

And you can see the option one was successfully selected.

Okay.

The second example, how you can select the radio button is using another type of the locator using

the grid form get by role.

And in this example we will take a role of radio and we provide the name of the radio button, which

is option one, and we do the same thing.

Check for true.

Let me comment this out and run this test one more time.

Yeah.

And you can see option one is also selected successfully.

So there are two options get by label or get by roll radio.

Now how to validate if our selection was actually successful?

If you want to use a generic type of the assertion first you need to take the status of this radio button.

Is it selected or not?

So create a new constant and call it, let's say radio status equals two.

Then I take my locator of radio button and type is checked.

So is checked will check the status of this radio button and will return us a boolean.

Is it true or false?

So if this radio button is checked, radio status value will be true.

If it's not check radio status, value will be false.

And then we make a validation of expect

radio status and assertion will be to be truthy this one.

So we are validating the status is actually a true.

Let me run this one more time.

And test is passed successfully.

Second type of the assertion would be locator assertion.

It will be a wait expect we provide the locator which is using the grid radio option one.

And we use a method to be checked.

And this is the second way of validation of the status running this test.

Yeah.

And it's working fine.

And let's continue our script with just a couple more validations.

So let's say we want to select the second radio button, which is option two, and then we want to validate

that after we selected the option to radio button, Option one should not be checked.

All right, so let's do this.

So just taken this locator right here, copy pasting it and providing option two.

We want to select this one.

And after we selected option two, we need to validate the option one radio button is not checked.

So how to do that?

And I will use my generic assertion and without creating a new constant, I just copy my entire command

inside of the expect.

And then here I validate to be falsy.

So I am validating that it is not checked anymore.

It is falsy.

And then I am validating that the option two is.

To be truthy.

This one is selected.

So option one is not selected.

It's falsy and option two is selected.

It is truthy.

Let me run this test.

Yeah, you see, it works successfully.

Option two was selected and we see this test pass successfully.

All right.

So let me quickly summarize what we did in this lesson.

In order to select the radio button, the most recommended way is to use Get By role radio and provide

the name of the radio button.

To select the radio button, use a method to check if the radio button is hidden.

For some reason, you can use a command force True to bypass playwright check of availability in order

to validate the status.

Is it selected or not?

You can use generic assertion or locator assertion for generic assertion.

Using method is checked, you can get the status of the web element and then you can make validation

of the status.

Is it true or false?

Or if you use locator assertion, you can use method to be checked and as a shortcut for generic assertion,

you can always provide the entire locator as the argument to the expect command and then to validate

if the radio button status is falsy or truthy, which means is unselected or selected.*/
