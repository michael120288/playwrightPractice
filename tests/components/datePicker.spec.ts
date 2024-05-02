import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("datepicker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  await page
    .locator('[class*="day-cell ng-star-inserted"]')
    .getByText("2", { exact: true })
    .click();
  await expect(calendarInputField).toHaveValue("May 2, 2024");
});
test("datepicker 2", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  let date = new Date();
  date.setDate(date.getDate() + 7);
  const expectedDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
  const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShort} ${expectedDate} ${expectedYear}`;

  let calendarMonthAndYear = await page
    .locator("nb-calendar-view-mode")
    .textContent();
  const expectedMonthAndYear = ` ${expectedMonthLong}  ${expectedYear}`;
  while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    await page
      .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      .click();
    calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
  }
  await page
    .locator('[class*="day-cell ng-star-inserted"]')
    .getByText("2", { exact: true })
    .click();
  await expect(calendarInputField).toHaveValue("May 2, 2024");
});

/*
And in this lesson we will talk about how to automate date pickers, how to select date in the date

pickers and assert the value inside of the input field.

So let's go to the forms and date picker page of the test application.

And here is our date picker.

So we will work with this one.

We will select a different date here and make the validation that this date is showed up in this input

field.

So let's start a new test.

So the first thing that we need to do is, of course, navigate to Datepicker page.

So let me take something from the previous test.

I'll take this and instead of the form's layout, we will navigate to a datepicker page.

Okay, that is done.

The next step.

We need to find the locator for our date picker form.

Let me clean this right click.

Inspect.

And what we can do.

We can take this placeholder form picker and select this input field by a placeholder.

I will create a new constant for the input field.

Calendar input field equals to page dot, get by leaseholder and we'll use the form picker placeholder

name.

That's it.

And then we need to click on this calendar input field just to open it, click.

All right, let's first verify that it is working.

Open the playwright runner.

Date picker run.

It made a click, but we just don't see that it is open.

So let me run this right here in the browser just to view that it is opening the input.

Yeah, so we see the calendar now, the next step, we want to select any date in this calendar and

let's inspect our application just to see what's the structure of the calendar right here.

So let's say we want to select the June 14th, right, right click inspect and what we see.

So we see that we have NB calendar day cell, and each of this tag represents the cell inside of the

calendar so we can use this.

So also we have rows and we have the entire NB calendar picker So you may think that the first approach

would be is to choose this NB calendar picker and then select any date inside of it.

But here is a little trap.

As you can see, we also have a date in this calendar that belong to a different month.

For example, 28, 29, 30 and 31st belong to the May.

And if I select this one, the different month is selected.

But we want to select only the dates within a June.

A June is this section first to a 30th of June.

Because if we try, for example, select the 30th of June, instead of selecting this date, it will

select the 30th of May.

And that's why we need to specify more detailed locator to select only the current dates of the month

of June.

How to do that.

So let me inspect the first and the previous element to see what's the difference.

And here we go.

Look at the different class name.

The class name for the 31st has the name bounding month day cell and star inserted.

Whereas the June 1st has day cell in star inserted and using the difference of the class name, we can

specify that we want to select only the dates that belong to the current month of June.

So let's start with the selecting the entire class value.

I copy this class and create a new locator await page locator and I want to select by this class.

So this locator will give me all the elements that related to current month of June.

And then within this month we want to select our date just by text, get by text, and let's say we

want to select 14 and then we make a click and this should work.

Let's try.

Running the test.

Yes, you can see the June 14th was selected in the calendar.

So this works perfectly fine.

But let's say if we try to select the June 1st, what happened?

Let's run this one more time.

And now we have a problem.

Look at this.

So playwright found so many locators because one exists pretty much in ten, in 11, in 12, and so

on.

This happens because if you provide the value, get by text, it is looking at partial match, not the

exact match and to specify the exact match, we just need to provide the additional flag which will

be exact.

True.

And in this case, playwright will search exactly the number one value as a text.

Running this again.

And it works perfectly fine.

June 1st was selected and now let's make the assertion of our date await.

Expect our calendar input field.

To have value.

And the value is June 1st of 2023.

Running this one more time.

Okay.

And it's working.

Assertion passed.

All right.

I guess that's it.

So let me quickly summarize what we did in this lesson.

The best way to select the dates in the date Picker is first to identify a unique locator that represent

the list of the date cells that you want to select for the current month.

And then within this list, select the date by text and making sure you provide the flag Exact true.

So you will select the exact value in the calendar that you want to select and to assert the result

of the selection.

We can use a locator assertion to make sure that the value is displayed correctly in the input field

and few words that this, of course, is not the desired way to select the dates because we hard coding

the dates in the calendar and the dates in the calendar is always changing because the time is moving

on.

And in the next lesson I will show you how to use a JavaScript date object to choose The date dynamically

depends on the current date and time.

And in this lesson we continue to work on our date picker and make it a little bit smarter.

So in previous lesson we were able to select the June 1st in the calendar.

But imagine the situation in real world scenario when you want to select the date for, let's say tomorrow

or date for the next week or date for the next month according to business requirements, you definitely

don't want to go and update manually the date selection in your test every time you want it to be somehow

automatically.

So test will be smart enough and select the desired date, let's say, for tomorrow every time you run

the test.

So how to do this?

In this example, we can use a JavaScript date object that will help us to manage the selection of the

date.

So let's continue improving this test and we'll introduce the date object, create a new variable.

Let's date equals to new date.

So what is this?

Date is a JavaScript object that can perform a different operations with the date and time.

New is the keyword that will create a new instance of this object and we assign this instance to the

date variable and then we can access this variable to perform a different operations.

For example, date, I click dot and here we go.

I have a different methods.

Get time, get full year, get date, get hour, get minutes, get month, seconds and so on.

How do I know which methods to use and how to use them?

Usually you can use just Google the answers or you can go to the official documentation.

I type JS date in the Google and first mozilla.org you can find documentation about the date and here

is for example, date get date.

You can find the description.

What is it doing?

For example, the get date method of the date instance returns the date of the month for this date according

to the local time.

And you can always run the any code snippets here and see what is actually doing.

So here you can see we provide the exact date as an argument to the date object.

But if we remove the argument and just use a plain date object and run it again, it returned the current

date.

So today is June 20th and it returned that the day is 20.

Or if we take, let's say, get full year and do the same thing, I remove the argument and try to run

it.

It will return 2023 a current year.

So using this different methods that represented in date object, we can perform a different operation

with the date.

And let's say we want to create the object that will return us a date, let's say seven days from today.

So let me show you right here in this JavaScript window example how we can play around with the date

and let's say make it bigger.

So I take the existing new date object.

Then I type date.

Set date and I update my current date.

Get date plus seven and I will need to add parentheses right here.

Okay, so what I'm doing here, I'm getting my existing date for the current date, adding additional

seven days to the current date.

And then I set this date to the current date object.

And let me print this out to the console.

Run it.

And what we see, we have a June 27th, 2023.

So the date object provides us all the details about the future date.

And let's say if I will add, let's say 20 days from today and run it again, it will be July 10th,

it will be Monday, July 10th of 2023.

If I will add just a single day and run this again, we have Wednesday of June 21st, and now we can

use this JavaScript code inside of our playwright code and pull whatever information from this date

object we need.

So I'm copying this and going back here.

So date, set, date, get date plus one.

So the next step instead of hard coding the selection of the date right here, let's replace it with

a dynamic value.

From this object, I will create first new constant and I call it expected date equals to call my date

object.

Then I do what get date get date will return me a date of the month.

And since this is a number, I need to convert it to string.

To string.

That's it.

Then I take this expected date and replace my hardcoded value with the variable.

And here our assertion would be if today is June 20th, so it will be June 21st.

So let's run this test.

Yeah, you can see it's working perfectly fine.

It selected a June 21st for us, which is the plus one day from the current day.

But we also have this hard coded value, right?

So let's figure this out.

How to replace the dynamically as well.

So we have here what we have date is 21.

We know this value now we need also value of the year and we need value of the month and all those values

we can pull out from the date object.

Let's do this first.

Let's create a constant for the month const and I will call it expected

month short.

I call it short because this version is a short version of the month.

It's not June like this, it's June.

This is how it is selected in our application.

Let me go back.

So for example, if I pick the 21st, it's displayed as June.

If I will select, let's say July, it's selected as Jul.

So we want to get a string that have exactly the same format.

For example, here inside of the entire calendar we have a July, a full version of the month.

While in the string of the assertion we have a short version which is Jul.

So I want to get this value of the month, which is a short version, so equals and I will use again

my date object and method to local string to local string.

This one date format for this test application is in US format like in United States.

So I put in us and provide the another parameter that I want to get a short version of the month.

That's it.

So this variable will give me a short version of the month and I need one more constant, which will

be expected year.

Expected year equals to again date dot get full year.

This will give me the full year for the date.

And then we need to create a new date that will represent our assertion in this format.

Const date to assert equals to.

And then I will use JavaScript interpolation to build a new string with this format.

I use a backtick.

I remind you this is not a single quote.

The symbol is located on your keyboard right under the escape button and I build a new string.

So first I need a short version of the month.

Then space.

Then I need.

Expected date.

Then comma space.

And the third value would be expected here.

Okay, that's it.

And then we can take this new constant that will represent a new value to assert and replace with a

hardcoded value right here D to assert.

That's it.

Let's run this test.

Perfect.

It's working fine.

You see that June 21st was selected.

So let's try to select, let's say, seven days from today, which will be in next week, and run this

test one more time.

It also worked perfectly fine.

June 27th was selected this time.

But look what happened.

If I will try to select, let's say, two weeks from now, and this test, of course, will fail because

two weeks from now is another month.

So let me run this.

Our calendar is not smart enough to handle the month change.

So we expected July 4th, but actually selected a June 4th.

So let's make this improvement and make our code even more smarter so it will be able to change the

month of the calendar if we want to select the date for the next month.

So let's look into application and see what we need to do here.

So if I click here on the month, let's say I select June 20th and if I want to select the next month,

I need to click on this little icon here to select the next month and then select the date.

So here we need to create a condition that will look for the month that we expect.

For example, our date object will expect a July, but this is show as June and we can write a condition

like this if this month displayed in the calendar is not July and not the year that we expect, we want

to click on the next month and make validation again is this is a month that we are expecting.

If yes, then select the date in the calendar.

If not, click on the next month and look for the next date and so on and so on.

So we will implement the logic right now that we're going to handle this month switching in the date

calendar.

So we begin with the finding the locator for this particular element because we need to take this text

from the calendar and compare it with the expected date that we want to select, inspect, right click

and locator could be this and be calendar view mode.

Sounds like legitimate locator going back and creating a new locator.

Calendar month in year and a wait page dot locator calendar.

And we want to get a text content for this particular element.

So this value will get the value of the calendar.

Picker And I created not constant.

I created a variable with the Let because later we will reuse this variable for our logic.

Okay?

The next step we need to create a new constant that will represent the expected result in this format.

July Space 23.

So inspect.

Look at this.

Let's find how this text looks like.

Here we go.

So we have space.

July space 23 space.

We need to create the same format of the string from the expected date from the date object.

Let's do this.

Const.

Expected month and year equals to what?

So we need the month and we need a year, but we need a longer version of the month, not the one that

we used before.

So we need to create another constant that will give us the full value of July from the date object.

I'll take this, rename it as long and here provide long as well.

That's it.

And now we can combine the string that we want.

So I take this variable expected month long.

Space and expected year.

We already have.

Here.

Done.

Now we need to create a loop, and for that we will use a while loop while condition and the code.

So what kind of condition do we want?

We want to compare the expected month and year and the current calendar month and year.

And if calendar month and year that displayed on the page is not the same as we expect over here, then

we want to click on the next month button and repeat the cycle again and again until the desired month

will be selected.

I will type my logic like that.

Calendar month and year dot includes the expected month and year.

And I want to say that it's not so if my calendar month and year does not include expected month and

year, I want to click on the next page.

So the next calendar page would be this icon.

Let me inspect on this.

What would be the locator for this?

So we have a Chevron, right?

Let's look up and be calendar pagination and sounds like we can use this combination so we can find

this tag name first and then select this data name Chevron.

Right.

Let me do this.

A wait page dot locator.

Finding this first and then child element will be.

Chevron, right?

And make a click.

And then after we made a click, we want to get the text of our month one more time and then we will

repeat the cycle again and again.

So one more time look.

What about to happen here?

First we get a text that is displayed in the current date picker selector.

Then from the date object, we are getting the expected month and year that we want to select and then

we start a while loop.

If the displayed month and year does not include the expected month in year, we want to click on the

Chevron right to flip the month and then after we flipping the month to the right, we want to get the

text one more time and we repeat the cycle again, going to the while loop and once the date will match

the date which is displayed, match the date which is expected.

This while loop will be stopped and we will select expected date and assert this date.

So let's run this one more time.

So I remind you we should select the July for right now.

So July 4th is actually 14 days from today.

And let me show you something more really fun.

It's working fine.

Let's say if I want to select 200 days from today and I run this test one more time in the browser view.

Yep, you can see it selected January 6th, 2024.

And if I select, I don't know, 500 days from today.

It selected November 1st of 2024 and successfully made the assertion.

So our logic working perfectly fine.

And right now our script is smart enough to select any date for the future date in the calendar.

And if we want to select the next week in our date calendar, we don't need to make it manually anymore.

Script will handle this for us.

All right.

So let's quickly summarize what we did in this lesson.

Using the JavaScript date object, you can get current date and time and then modify this date and time

object with the values you need.

You can extract, date, you can extract month, year and format result a string to the value that you

actually need.

Then we created a while loop that can select the desired month in our calendar in order to select a

correct date.

And then we replaced the variable with expected date and date to assert in our assertion to make the

assertion of date that we selected.
*/
