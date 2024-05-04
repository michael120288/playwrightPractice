import { test, expect } from "@playwright/test";
import { PageNavigationManager } from "../../pageObject/manager.page";
import { NavigationPage } from "../../pageObject/Navigation.page";
import { FormLayoutsPage } from "../../pageObject/Layout.page";
import { DatePickerPage } from "../../pageObject/DatePicker.page";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("navigate to from page", async ({ page }) => {
  const pnm = new PageNavigationManager(page);

  await pnm.navigationPageClass().formLayoutsPage();
  await pnm.navigationPageClass().datePickerPage();
  await pnm.navigationPageClass().smartTablePage();
  await pnm.navigationPageClass().toastrPage();
  await pnm.navigationPageClass().tooltipPage();
});

test("parametrized methods", async ({ page }) => {
  const pnm = new PageNavigationManager(page);

  await pnm.navigationPageClass().formLayoutsPage();
  await pnm
    .formLayoutPageClass()
    .submitInlineForm("mike@test.com", "123456", "Option 1");
  await pnm
    .formLayoutPageClass()
    .sumbitInlineForm("Mike", "michael@test.com", true);
  await pnm.navigationPageClass().datePickerPage();
  await pnm.datePickerPageClass().selectDateFromDatePicker(5);
  await pnm.datePickerPageClass().selectDatepickerWithRange(10, 15);
});

/*
And in this lesson we will talk about parameterized methods inside of the page objects.

So in this lesson we will create two methods for our form layouts page to fill out the form using the

grid and inline form.

And we'll make those methods parameterized.

So going back to the framework and I create a new page object class form layouts page.

That's.

Copying the import of the page from the previous page.

Creating a new class.

Export class.

Read in your field for the page

and creating constructor.

So.

And let's create the first method to submit the form for using the grid sync.

And I'm giving the name to this method describing what exactly this method is doing.

So it's submit using the grid form with credentials and select option.

So this will be a method name.

As I was mentioning before, don't be afraid to giving the good descriptive names to your methods.

It later always will be easier to navigate across your frameworks and understand what those methods

are for and what they are doing.

So using the grid form have three fields that we want to fill out is email, password and select radio.

Different options, option one or the option two.

So let's create three parameters in mail is type of string, password type string as well.

And third parameter will be option text string as well.

That's it.

And now we need to create the code to submit this form and using those parameters to speed up the process.

I can simply take some of the code from the previous lessons and copy paste it instead of typing it

again so we can take this constant.

Of using the grid form.

Game forms, layout and instead of page will be this dot page and wait using the grid form and we need

to fill out email and password.

This will be get by role email.

Feel we want to feel email and the same thing will be for the password.

Password and we need to fill out the password.

I use the parameter.

Then we need to select the option.

It's this.

Get by role.

Radio Button.

Get my roll ready, option one.

And instead of using the option one text, we will replace it with the parameter option text and the

last step.

We need to submit this button and wait using the grid.

Get by roll.

Button.

Click.

All right, that's it.

Our method is ready, and implementation is responsible for just submitting the form of using the grid

with three parameters email, password and option text.

Email will replaced right here to fill out the email password we replaced right here.

And this line of code will select exact option that we want to select.

Right now we just simply call this method from the test and use it.

So let me create a new test.

Test Parameterized methods.

Since we created a new page object, we need to import it first.

Import form layouts page.

And then we need to create a constructor of this object inside of the test.

We need to import navigation, page object and const on forms.

Form layouts page equals to new form layout page and pass page fixture inside of the constructor and

then simply call the page objects.

Navigate to forms layout page on forms, layout page, dot submit using the grid and credentials.

And then we need to provide three parameters Email for example.

Test at test.com.

Second parameter is password.

Let's say welcome one.

And third parameter is the option that we want to select.

Example Option one.

That's it.

So let's run this test and let's see how it's working.

Okay, it does not.

So it was not able to fill the email.

We forgot to use a weight, of course.

And a.

Okay, let's run it one more time.

And right now it works successfully.

Email filled out, password filled out, and option one is selected.

And now let's say if we want to run a second test but with a different credentials, all we have to

do is just call exactly the same method, but use a different arguments inside of the method.

So instead of, let's say, option one, we want to select right now option two and run this test again.

And option to successfully select it.

And we click sign in button and let's create one more example for the inline form for this one.

Same thing, I think submit in line form with name, email and check box.

So for this form will be pretty similar.

So we need to submit a name which will be a string.

Then we need email which will be a string as well.

But third parameter is a checkbox we can provide as a boolean.

So either true or false.

Remember me checkbox will be type of boolean and we will incorporate this logic inside of the method.

If the boolean is true, we want to click on the checkbox.

If false, we will not click on the checkbox.

So I guess we can take the part of this code and just reuse it in this form.

So this will be instead of using the grid.

Inline form

exactly is on our application.

Inline form.

In line form.

Then we want to select the field which has this value.

Jane Doe.

Jane Doe.

We will fill out the name over here and the second value will be email and we will fill out.

Email right here.

The last argument is the checkbox and we create condition inside of this method.

If we have read me as a true and we don't need to provide like equals to true.

We don't need it like that.

So we just provide.

If read me it evaluates true or false, then we want to await inline form get by role checkbox check

force.

True.

And the last step after that we need to just submit the.

Button.

In line form.

Get by.

Roll button.

That's it.

And let's call this method again from our test.

Await on form layout page, and we have two methods available right now.

We want to submit inline form and again, we provide three arguments.

For example, it will be John Smith with email john@test.com.

And we want to remember John during the submission so we type true to select the checkbox inside of

this form and let's run this test.

All right.

The second form is submitted and checkbox is selected.

And let's say if you put false.

And run this test again.

And right now checkbox is not selected and form submitted without this checkbox.

So this is how you can reuse methods inside of the page objects and make them even more smart.

So just providing different arguments.

You can use those methods in different test scenarios.

So you technically use the same code implementation, but just with the different test data that needed

for your test execution.

And let me show you one more thing to better understand the description of your methods.

So if you just hovering over the method right now, you can see the method name and you can see what

arguments it require.

Name, string, email, string.

Remember me is Boolean.

So IntelliSense will give you a hint which arguments this method is expecting, but you can additionally

provide the more information about your methods exactly in the page object.

For example, we take this second method and we use this kind of syntax forward slash double star and

vs code will create a block for you automatically with the description of the method.

And you can type something like this.

This method fill out the inline form with user details, for example.

And then for each of the parameter you can describe what is it for?

For example, name should be first and last name, email, valid email for the test user and remember

me true or false if user session to be saved, something like that.

And then if we go back to our test and hovering over this method one more time, now you see this description

about the method implementation.

This method fill out the inline form with user details and the description for each of the parameters.

So this is very handy approach.

And if you keep your page objects like that with good descriptive names, with the annotations about

what those methods are doing, it will be very easy to navigate across the framework and find the suitable

method for different operations.

All right.

So let's quickly summarize what we did in this lesson.

In this lesson, we created a new page object related to the form layout page, and we created two methods

parameterized methods to submit two of the forms.

This is a very powerful technique providing the different parameters as a required argument inside of

your method.

You can differentiate the scenarios that you can execute in your test, so you can use the same method

inside of the different test, but just providing a different arguments in your method.

You can create a different user flows and you can create additional annotation to your methods with

the detailed description, what those methods are about and what those parameters are about.
*/
