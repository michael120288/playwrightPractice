import {test} from "@playwright/test"

test('My first test', async({page}) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click()
  await page.getByText('Form layouts').click()
})

test('Parent elements', async({page}) => {
  await page.locator('nb-card',{hasText:"Using the Grid"}).getByRole('textbox',{name:'Email'}).click()
  await page.locator('nb-card',{has:page.locator('#inputEmail1')}).getByRole('textbox',{name:'Email'}).click()

  await page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('textbox',{name:'Email'}).click()
  await page.locator('nb-card').filter({has:page.locator('.status-danger')}).getByRole('textbox',{name:'Email'}).click()

  await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'}).getByRole('textbox', {name:'Email'}).click()

  //not recommended
  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name:'Email'}).click()

})


/*

And in this lesson, I will show you how to find a parent web elements and how to use this powerful

technique to find a unique elements on the web page.

So I'm going to start a new test.

So in the previous lessons when we were trying to select the input field for the email, we were using

such things like a first element or particular index of the form that we want to select how we can use

the power of the parent elements to find the exact email input field that we want.

So we need to find something unique about each of the form in order to exactly locate the form.

So we have a different forms on this page that have email fields.

And what is unique about those that they all have a unique name, such as using a grid, basic form,

an inline form and so on.

If we open on any of those forms, for example, using the grid and let's quickly inspect the structure

of this form.

So the text, which is unique for each of the page is and card header, while the rest of the card of

the body located in the card body.

So in card header and in card body are sibling elements.

So that's why if we would try to locate using the grid first and then trying to find the child elements

such as email input field, it would not work because in the card body simply is not a child element

in relation to using the grid.

So what is child element is the entire card, but no card is a parent locator for using the grid for

card header.

So the question how to find the dnb card locator with definition that we want to find dnb card only

for the text using the grid.

So we want to find the text and then a parent.

I will show you a few techniques how to do that.

So the approach number one.

So we put a wait page locator and we want to find our DnB card, right?

Because as we know, this is the target element that we want to find, but we can provide a second argument

to the locator method in form of the object that would specify our details for this search.

And we want to find DnB card that has text using the grid.

Using the grid.

That's it.

This way.

Playwright will give us only card that has this particular text.

It doesn't matter where exactly it can be located.

Any inside of the Dom for this particular end card.

But only one element will be returned instead of the several elements like we did in the previous lesson.

And that's it.

And then we can chain the next command out of this locator to find the desired element.

In our example, what we wanted to find is this get by role email and perform a click get by role text

box.

Email click.

And let's run this.

I open.

Playwright.

Runner.

Locating parent elements running the test.

Yeah.

You see, it works perfectly fine.

We were able to click on the email.

Okay, moving on.

The next example, what you can do with the locator is providing a second attribute.

But not as text, but as allocator.

So has page dot locator and we can provide any other unique locator inside of the card that can be used

as a unique identifier for the particular card.

And we know for this particular card we have an ID, So if we inspect on the ID, we have this ID input,

email one and we can use this as our additional identifier for the exact card.

And put locator ID.

And the rest is the same.

Get by.

Roll email.

Click.

I'm running this one and this also was successful here.

I'm selected this step.

We can see the click was performed successfully.

So one more time by providing a second argument into the locator method, you can filter the output

of this locator method and you can filter either by text or by the locator.

So let me show you another example which is very similar to this one.

So page dot locator and we want to find again and B card, but this time, instead of using built in

feature into this method, I will use a dedicated method called filter.

Which has pretty much similar capabilities to what is the second argument has for the locator method,

but it is independent method in the playwright.

So we can do the same thing we can do pass text and then let's select this time, for example, basic

form and click on the basic form email input field.

I'm running this again.

And here we go.

Click was performed on the basic form and the same exact thing you can do using a locator as a filter,

a wait page dot locator.

And be quiet.

Then we want to filter has page locator and we need to find some unique locator for the basic form.

Let's quickly take a look.

So what we can do is we can take a color of this button because other buttons on this page has a different

color.

So this color is unique.

So I make a right click on the button and we probably can take let's look, look, look.

So we can take this class status, danger.

This should work.

And I put that status danger and the rest is the same.

And this time, instead of clicking on email, let's click on password input field.

Yeah, the password field was successfully selected.

So you may wonder what is the difference if locator has an option to filter the result?

Why do we need to use a filter method?

Two reasons.

The reason Number one is if you want to use a user facing locator such as getting by role get by role

does not have a filter like that.

So you can chain an independent method filter to filter the result and to find the parent element that

you want.

And the second reason that you can actually chain a multiple filters one by one in order to filter your

result output.

So let me show you this example.

Let's say that we want to find we want to find the email input field for this particular form.

So let me collapse this.

And for example, we have an B forms this form, this one, and this form has a checkboxes, right?

So we can filter them first by checkboxes and then we can filter by the name of the button sign in.

So this is sign in button, but we have another sign in button, which is this one.

But this form doesn't have a checkbox.

That's why playwright will return us a unique combination of the form that have a checkbox and have

a sign in text in there.

So let me show you that.

So I type await.

Page, dot locator and B card.

Then what?

First filter we want to filter it by the checkboxes.

Has page dot locator and the locator for the checkbox is let's see, right click inspect locator for

the checkbox is this and B checkbox.

And we take this one after the first filter is applied, we're going to have A three and B inputs returned.

But now we applied a second filter, dot filter.

And the second filter we want to apply by text has text sign in and the rest we put a well known command,

get text box by email and click.

Right here.

So going back and running the code.

Here we go.

And the expected email form was selected.

So going one more time, first we found all DnB cards, then initial input.

We filtered once finding only those cards that have a checkboxes.

Then the filtered checkboxes card we filtered one more time only with those that have a sign in.

And since this is a unique combination of those, eventually only one DnB card was returned.

And then within this DnB card we found a text box with name email and we performed the click.

This is how it worked.

And the very last example of locating a parent element is not recommended but still possible to use

when you want to just go one level up.

For example, here for our, let's say, using the grid.

So using the grid is located in the DnB card header for us, in order to access the body, we need to

just one level up to end the card and then find the child element so you can do it using the XPath.

And this is, I believe the only one example when you should use XPath in the playwright.

So locator.

And let's say we want to find first by the text text is

using the grid.

Then I put locator and as a second locator I'll put dot dot with this combination we will go one level

up to the parent element and then we will perform the selection of our email input field.

So let's run it.

Yeah, you can see it's also worked perfectly well.

The email input field was selected.

That's it.

So let's quickly summarize what we did in this lesson.

In order to find a web element using a locator method, you can use a text filter or a locator filter

and then chain from this parent element all the child elements that you want to select.

Also, you can alternatively use a filter method that will do exactly the same thing.

What is the benefit of using a filter method that you can chain multiple filters one by one, narrowing

down your output to the unique element until you get the desired result.

And if you just want to go one level up in the Dom to the parent element, you can use XPath approach

by providing just double dots into the locator element and then find the child element that you want

to find.
*/
