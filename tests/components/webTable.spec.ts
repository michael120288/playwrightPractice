import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test('web tables', async ({ page }) => {
  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  //1 get the row by any test in this row
  const targetRow = page.getByRole('row',{name:'twitter@outlook.com'})
  await targetRow.locator('.nb-edit').click()
  await page.locator('input-editor').getByPlaceholder('Age').clear()
  await page.locator('input-editor').getByPlaceholder('Age').fill('35')
  await page.locator('.nb-checkmark').click()

  //2 get the row based on the value in the specific column
  await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
  const targetRowById = page.getByRole('row',{name:'11'}).filter({has: page.locator('td').nth(1).getByText('11')})
  await targetRowById.locator('.nb-edit').click()
  await page.locator('input-editor').getByPlaceholder('E-mail').clear()
  await page.locator('input-editor').getByPlaceholder('E-mail').fill('mike@test.com')
  await page.locator('.nb-checkmark').click()
  await expect(targetRowById.locator('td').nth(5)).toHaveText('mike@test.com')


  //3 test filter of the table
  const ages = ['20','30','40','200']

  for (let age of ages){
    await page.locator('input-filter').getByPlaceholder('Age').clear()
    await page.locator('input-filter').getByPlaceholder('Age').fill(age)
    await page.waitForTimeout(500)
    const ageRows = page.locator('tbody tr')

    for(let row of await ageRows.all()){
      const cellValue = await row.locator('td').last().textContent()
      if(age == "200"){
        expect(await page.getByRole('table').textContent()).toContain('No data found')
      }else{
        expect(cellValue).toEqual(age)
      }

    }
  }
})

/*
And in this lesson we will talk about web tables.

So automation of the web tables sometimes can be tricky just because of the structure of the web tables.

So, for example, let me click on Inspec and I will show you what I mean.

So table always starts with a table tag.

When you open this, usually it has table head or table body, sometimes without the table head, it's

just a table, body tag.

And then inside of table body, we have a table rows, which is TR tag and each TR has TDs.

TD is table down, which is table column.

So if I hover over each TD, you can see that it is highlighted.

The tricky part of working with the web tables is identifying the unique enough element to pick up the

certain cell from the table or the certain row from the table and making your test table or for example,

a tricky part how to select the entire column in the table.

It is pretty difficult task because we know that we have table rows and all columns are within each

of the row, so there is no way how you can select the entire column vertically and just process the

values from this column.

So in this lesson, I will show you the tricks, how to overcome this difficulties so you will be comfortable

navigating through the table and automating any scenarios in that.

So in this lesson, let's automate the scenario like this.

So let's say we will take a third user from this row.

We will find this user by his email.

You know that email is a unique for each of this user.

This is a unique identifier.

So we're going to find this row and we will modify age for this user.

So we change 18 to, for example, 35.

Let's automate this scenario for the beginning.

I going back to the framework and creating a new test.

From the previous test.

I'm going to copy tables and data in Smart Table because we already used this page.

And the first example I want to show you is how to get the row by any text in this row.

We already kind of using this example in the previous lesson when we were automating the dialog box.

But I would like to show you this one more time.

So first thing we need to get the locator for the row and this is the row that we are interested in

and the unique identifier.

We know that this is this email, so let's do this email as a unique identifier.

Const target row equals to page get by role.

And the recommended way to get the desired role in the table is to use row role type and then provide

the name and provide the text value, which is unique for this particular row.

And this is the email address.

Here we go.

And now we can perform any operations within this row, whatever we want.

So the next step would be we want to click on this pencil to edit the details in this row.

So right click inspect and the pencil class is NB.

Edit.

Awaits target row locator

and perform a click.

That's it.

So let's run this real quick to make sure that it is working as expected.

Yeah, you can see the click was performed and our row right now is in edit mode.

Moving on.

So the next thing we want to click on this pencil button, right?

And modify the age for this user.

And the first thing that you may think is let's navigate just to this row by using this locator that

we already have and update this age.

So sounds simple, right?

But look what we actually have.

So if I make a right click on this email and navigate, we can see that this email is displayed as a

text inside of this row when this row is not edited.

But if I click on the pencil.

You see that the dome is changed.

And if I will try to inspect the same cell one more time, this value does not exist here anymore.

This is not a text anymore.

This is a property right now and we can see only that in reflect model has this value and it became

an input field.

And remember I mentioned before that inside of the input fields, very often the text that you see is

not the actual HTML text.

This is a property value and this is our case.

That's why this locator will not work because get by role and name name referring to exact HTML text

reflected in the row.

Since this is not a text anymore, this is a property value.

We cannot reuse this locator.

We need to do something different.

So what we can do, we can build a new locator, take this input editor HTML tag and take some other

property which is unique for the field.

And since we want to update the age, we can take inspect input editor and we can take a placeholder

age.

So let's do this await page locator.

First, we need to take this.

Input editor tag.

And then within get by placeholder and we can use H.

First thing we need to clear the existing value.

Clear input field.

And then we want to type inside of the same cell.

Fill.

35.

And after we type the value, we need to confirm that this has happened.

Right click on this icon inspect and this is NB Check mark class

await page locator dot.

NB check mark class dot click.

All right, so let's run this test.

All right.

You can see that H was successfully updated for our user right now is 35 if I will show the screenshots

before.

So we made a click.

Added 18.

Clear.

Now it's 35 and we confirm this.

So everything is working fine.

So one more time real quick.

You can always get any row in the web table by using get by, row, row and providing the text that

exists in this row.

But keep in mind that sometimes text in the table can be reflected as a input value.

In this case, you will not be able to use the locator like that.

You will need to use something different.

For example, we used a placeholder to identify the right cell in our table.

Moving on.

So let's make it a little bit more complex scenario.

For example, we want to select a row by the ID column.

So if we look into this table, we see that ID is unique and if we are going to next pages, all the

ID numbers is unique.

So we can technically is use the ID column to select whatever user we want from this table.

But here is a difficulty.

For example, if we go to the second page, we may have a situation when the ID is the same as the age,

for example, ID 11, and here we have a different column.

Age is 11 or here 19 ID and age 19 as well.

So if we follow approach from the previous example like get by role with this text, it will not work

because playwright will find for us two rows with the same text.

But how can we tell a playwright to find the row only by the specific column in the table?

So let me show you how to do that as well.

So let's make this scenario.

We will navigate to the second page of this table and then we update a user with ID 11.

So playwright should find just this table ignoring this one.

And we want to update, let's say this email to some new value.

So that's going to do this.

So the first thing, what we need to do is to navigate on the second page.

So how to do that?

Let's do inspect.

We can take the text too, but we need something more unique about this specific area.

And we can, for example, take this class or no, let's take this one in Smart pagination.

Now it sounds like unique.

So we can take this class and then within this class we can find a text that has two and we will be

able successfully to click on this particular page, a wait page dot locator.

We provide the class and then get by text to.

Dot click.

Okay, so let's run this really quick to see if it's actually clicking on the second page.

Yes, it's navigated to the second page.

Moving on.

So now a tricky part.

We need to create a locator for.

This.

Navigate to page two for this row by ID 11.

How are we going to do this?

Const let me call it target row by ID equals and it starts with similar approach.

Page dot.

Get by.

Ro.

Ro and I provide the name 11.

So let me run it and I will show you that it will actually try to find a two elements.

Let me make this quick demo.

Yeah.

And you can see we have an error.

Let me make it bigger.

So, yeah, two rows were found.

One is marked auto and the second one is Francisco Brady.

And this is exactly how it's supposed to work.

So this is our Francisco Brady with the age 11.

And first guy is the Smart auto with ID 11.

So now we have two rows found.

And out of those two rows right now, we need to find only a single row, which is the first one for

this particular guy by the ID column.

And how to do that, we need to use a filter method so we will filter our output of two rows and we

will provide the filter as a locator has and locator will be a column with a desired value.

So we type page dot locator.

We are looking for column TD and the index of this column is one.

So if I go back to application, so first column is actions, which is index zero and we are interested

in the second column.

So index should be one and it should be a number, not a string.

Okay.

And once we found this first column, we want to get by text and 11.

So one more time what's going to happen here?

So this locator will return us two rows in the table.

Then this filter will return us all columns for each of those rows.

Then we want to take only first column for the two rows and then that result we want to find only text

11 as part of the first column.

And because text 11 exists only in one of the rows in the first column, this entire expression will

return us a row that has text 11 in the first column.

So this is how it works.

And right now I can do with this row.

Whatever I need, I need to click on the edit button and let's see if this actually works.

Yeah, you can see we successfully selected the first row and right now it's in edit mode and the rest

is pretty simple.

So we can to speed up this process.

I can copy the previous two lines and we are looking instead of h, we are looking for email.

Email, clear email field and we want to fill a value

test@test.com.

And we can run this test one more time.

Uh, okay.

Test at Test.com.

Sounds good.

Now we need to submit the checkmark click to confirm our update.

And let's say we want to add the assertion that we successfully made the change.

So I type expect.

Now I need to find this column and make an assertion that this text was updated.

So now I can use this row again because it is not in the edit mode anymore and I can reuse this locator

locator

TD.

I need to find all the columns in my row and the column index would be 012345.

So email is a fifth column in this row and five.

And it should do have text.

And we are expecting this test at Test.com to be they're running it again.

Okay.

It works successfully.

We have assertion.

Assertion is passed.

And let's quickly summarize what we did in this lesson.

If you want to locate any row in the table and your table has a unique text, you can use this for get

by row and provide the text that is displayed in the table.

Keep in mind the text that displayed in the table.

Not always text.

It sometimes can be a value.

In this case, you will not be able to use this construction.

You will need to use a different identifier such as get by placeholder or something else.

If the text that you are looking for in the row is not unique but unique for the certain column, you

can use a filter narrowing down the output of your row by a specific column using the constructions

like that using a locator filter.

Then when you want to make the assertion, you can always navigate into the desired column by the index

of this column and make an assertion.

All right.

That's it, guys, and see you in the next lesson.


*/
/*
And in this lesson, we continue working with the tables.

And I want to show you one more scenario how to loop through the table rows and make a validation of

the table rows.

For example, we have a feature in this table that we can make a search of the certain values.

And let's say if I make a search by age 30, we have one output.

If I put 20, we have five rows.

And let's say I want to make a validation that when I make a search by age of 20, that output that

I have in the table has only the values that have a 20 years old and we don't have anything else in

this table.

So let's automate this scenario.

Going back to the previous test and we just continue what we did from the previous lesson.

So scenario number three, test filter of the table.

The first thing we need to identify the test data that we want to use.

So let's say we use ages and I create array with the values that we want to use.

We want to use age 20, we want to use 30.

Let's say we want to use 40 and let's say another, some scenario, let's say 200 years old and data

is not found.

So we want to validate that if no data in the table, some other message should be showed up.

In our example is no data found.

Let's use the fourth value of 200.

This will be the test data that we use and now we want to try each of these values inside of our search

field and validate the result for each search request.

So first of all, let me create a JavaScript loop.

For let's h will be our iterator of ages.

So we're going to loop through each of the value and for the each value we want to do what we want.

First is to type this value inside of this input field.

The locator for this input field will be very similar to what we did before.

We can take this.

Input editor, but instead of email, we will use age and this will be age as well.

Okay.

And what we want to fill out, we want to fill out the age value from our iterator instead of hardcoded

value like this.

And I guess let's run this real quick to see how it works.

So it did not work what we did wrong.

Probably locator is incorrect.

Okay.

Input Editor Placeholder by age.

Let me double check.

Right click inspect.

Okay.

This is not input editor.

This is input filter.

Okay.

We replace it with input.

Filter and let's run it one more time.

Yeah, it worked right now.

And you see it happened very, very quick.

It went straight to the 200, but still we know that it is working.

Now, the next step, we need to get all the rows from the table.

For example, if I put 20 here now, we need to get all the rows of the filtering output and then for

each of the row, we need to validate the very last column and loop through each of the row like that.

So we create another loop inside of the already existing loop for let row will be iterator of and we

need what we need to get first a locator for our rows.

Const age rows equals to page dot locator to body space.

TR So this simple locator will give us all the rows inside of the table body and then we use age rows

and remember that locator.

All that will create array for us of the web element and we need to use await to get each of the row

and we create the body of our loop.

Then for each of the row we need to get a cell value.

Cell value equals to row.

Sorry, await row locator.

It's a column.

We want to get a last column.

We have a special method for that and we need to get a text content.

So this constant will have a cell value for the row.

And since this is a loop for each loop cycle, we will get a cell value for each of the row.

And now we can make an assertion.

Expect cell value.

To equal to equal H.

This one.

Okay, that's it.

So let's look one more time into the design of our code.

We created all the test data that we want to use.

Then we created a loop to loop through each of the values and then using each of the H, we want to

find the input filter H.

Then we want to type the value of the H.

Then we find the all rows as a result of the search output.

And then we are looping through each of the rows.

We're getting all the rows all.

And here is the each of the row in the table.

And then we create a loop.

Row number one, getting the text content, row number two, getting the text content and so on.

And we should make an assertion that each row as a result will be equal to this.

H So let's run this test.

And this test is failed.

So we can see that the first value entered successfully, but not the second one.

So look into the error message.

We see that expected 20 but received 38.

Sounds very weird, right?

So it's entered our loop.

It got the value of the text content from the cell, but it got some interesting value of 38.

It didn't get a 20, so assertion failed.

So let's go back to the code and look one more time.

If I change the value, look what happened.

There is a certain little delay in the search, so when I type the value, it takes about half a second

for the table to actually change the layout.

So playwright is running faster than the change of the layout of our table.

So we need to create a delay between typing the value inside of the cell and until this filter actually

will be applied.

And this is like an animation.

So we cannot create, unfortunately, any dynamic waiting here.

So we just need to wait like a half a second, create a hardcoded, wait to wait until the value will

be updated.

So let's modify this.

We need to do it here before getting all the rows.

We need to create a wait page, wait for timeout and we will provide just a short timeout of half a

second.

And let's run this one more time.

Yeah, you can see Filter is working right now, but it's failed at the very last step.

No data found because our assertion is not smart enough.

It is expecting to have a 200 years old but received no data found.

So we need to create a condition inside of our loop that if the value is 200, we actually expecting

to have no data found.

For the other types of the ages.

We expected to receive the age as an output.

So let's modify the script a little bit and we type if H equals to 200, then we expect the assertion.

Else we expect this assertion for all other values.

Okay.

So we need just to find out this particular assertion locator.

So going back type in 200, right click inspect and we have no data found and it is part of the body,

so it's directly right as part of the table.

So we can say, okay, we can take the text from the table and it should contain no data found.

We can type locator like that.

Expect page dot, get by role.

We can take a table locator and we want to get all text content from the table.

And we expect that this content to contain

no data found.

All right.

And let's run this test one more time.

All right.

And right now, this test is passed.

We validated each of the search results inside of the test.

So let's quickly summarize what we did in this lesson.

When you look through the list of the roles, you can use a regular for loop.

In our example, we use first the test data and then we looped through the each of the row to validate

those expectations.

So we created a simple locator to get all the rows.

Then out of those roles need to create an array using all method and then row represent the iterator

for the row that you can access as a regular locator.

Finding the columns that you want to interact with.

And you can also use a conditions to tailor your assertion based on the output of the table.
*/
