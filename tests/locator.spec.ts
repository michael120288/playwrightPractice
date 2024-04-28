import {test} from "@playwright/test"

test('My first test', async({page}) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click()
  await page.getByText('Form layouts').click()
})
test('My second test', async({page})=>{
  //by tag name
  page.locator('input')

  //by id
  page.locator('#inputEmail1')

  //by class value
  page.locator('.shape-rectangle')

  //by locator
  page.locator('[placeholder=\'Email\']')

  //by class value
  page.locator("[class='input-full-width size-medium status-basic shape-rectangle nb-transition']")

  //combine different selectors
  page.locator('input[placeholder=\'Email\'].shape-rectangle')

  //by xpath
  page.locator('//*[@id="inputEmail1"]')

  //locator by partial text match
  page.locator('input:has-text("Email")')

  //locator by text match
  page.locator(':text("Email")')

  //by exact text match
  page.locator(':text-is("Email")')


})

//And in this lesson we will talk about locator syntax rules.

// So this is our test application and I am on the forms layouts page.

// Today I will show you how to use playwright to find different elements on this web page.

// And for example, we take this email input field for using the grid form and I click inspect and here

// is the input field.

// We have input tag.

// We have different attributes for this tag.

// We have ID over here, we have CSS selector, whereas our class here is our class with different values

// and parameters.

// So I will show you how to find this and locate this input element in the playwright.

// Going back to our project and let me quickly refactor this to prepare for this class.

// So I will take this step navigating to the forms into the Beforeeach and form layouts also will put

// it back to before each and I will remove this to test describes.

// We don't need them and create a new test locator syntax rules.

// Okay, here is our test body.

// And let's begin.

// So how to find the locator by tag name page dot and the most common method to find the locator in the

// playwright called Locator Locator method will accept two arguments.

// First is a string for your locator and second is the object for the different options of the locator.

// Above the options we will talk about later.

// Let's talk about the very first part, about the string of the locator that we want to provide here.

// So in order to find the element by the tag name, we just need to provide a tag name as our input string.

// So in our example, our tag name is input.

// So we type here input.

// That's it.

// So input is not a unique element for this page because if we go back you can see that we have many other

// input fields over here.

// So playwright will find for us all those web elements and return of all those elements.

// So keep in mind the next step how to find by ID page, dot locator and the syntax rule for the ID.

// In our example we have ID input Email one I just copied directly from the code and I put a hash sign

// and then the value of the ID.

// This is how to find the element by id moving on.

// How to find by class value.

// Page, dot locator and class value.

// We're looking for the class.

// This is our class and this is the class that we have.

// We have input field wide size, medium status, basic shape, rectangle and NB transition.

// Let's take for example, this one shape rectangle.

// I want to find all the web elements that have class value, shape, rectangle going back, put shape,

// rectangle, and in order to specify that this is a class value, I put Dot in front of this value so

// playwright will know that this is a class.

// If I will remove a dot, it will be a tag.

// If I put a hash sign, it means I'm looking by ID, but if I put a dot it means I'm looking by class.

// Moving on How to find by attribute page dot locator.

// Single quotes.

// And we have many different attributes over here.

// And let's say we want to find by attribute placeholder with value email.

// I copy this and to find web element by any HTML attribute, we put a square braces and put value inside

// of it.

// That's it.

// So playwright will find for us all web elements that has placeholder email attribute inside of the dom.

// Moving on how to find by entire class value.

// I put it like full value.

// It's very similar like by attribute with only difference that we need to provide the full class value

// with all the values that it's inside of it.

// Like this.

// So class input, size, medium and so on.

// So as I mentioned before, class has kind of a special role in the HTML Dom structure.

// So you can either find web element by the entire class as an attribute or use just a separate values

// of the class using a dot notation.

// What else?

// You can also combine.

// Combine different selectors so you can use a combination.

// Let me show you page dot locator for example.

// You want to find web element by tag and by attribute.

// So you want kind of make this more unique because input is very general tag name, but input in combination

// with placeholder email create a more unique web element.

// So how to do that is just simply put them together one by one input and then next to it.

// Placeholder email.

// Important not to put a space over here, so they should be like all together and you can add if you

// want the other values as well.

// For example, attribute and you want to add a class, this will work as well.

// Or if you want to have second attribute, this will work as well.

// For example, we want to use NB input so we can, in this case, add a second attribute and be input.

// It.

// It will work.

// So playwright will find match for the web element that have all three attributes as part of the web

// element and will return us all elements that have a match for that.

// Also you can find element by XPath.

// I think most of you are familiar with the XPath and the way to do it is page dot locator.

// And we put and for example we want to use this ID as our locator.

// So I put star at ID equals.

// To input email one.

// So XPath will work in playwright as well, but this is not recom mended and I want to show you the reference

// to the playwright documentation over here.

// So playwright says Like danger, we recommend prioritizing user visible locators like text or accessible

// role instead of using XPath that is tied to the implementation in easy break when page is changes.

// So about user visible locators, we will talk about the next lesson, but just for your information,

// according to the playwright, it is really not recommended approach and considered not a good practice

// to use an XPath.

// I know that most of the selenium users prefer to use the XPath because they just got used to, but the

// frameworks evolved and they became more modern.

// And right now with the modern frameworks like playwright using XPath is not recommended approach anymore.

// So end two other things that you can do with the locator.

// Let's say you want to find an element by partial text match.

// So we will use page locator and we provide column text and then we give a text that we want to find

// on the page.

// For example, we have this form using the grid.

// And if we take just first word of using the grid and provide using it will find a locator for us.

// And also you can find by exact text match, it will look like this page locator and then it will be

// column text is

// and provide the full value of the text using the grid.

// All right, that's it.

// So this is the main syntax rules and let's try to run it and I will show you something interesting about

// it.

// To run the test, I will use NP playwright.

// Test in UI mode.

// Okay, this is our mode and this is our test.

// So let me try to run it and what we see.

// So the page was opened, but we can see that nothing actually happened, right?

// So the rest of the code, the rest of the locators were not actually called.

// We just click on the form's layout and that's it.

// Playwright didn't try to find any of our element.

// Why is that happened?

// Because playwright will do anything with the web element only when we trigger any action for the web

// element.

// So let's, for example, I'll trigger the action for this particular locator, which is our ID for input.

// Email one and I would use a method click.

// And since click is our action method that returns a promise I need to use Await in front of it and let

// me run it one more time.

// And we can see that now.

// It's successfully clicked on the email field that we was trying to locate.

// And let me show you a different example.

// What if I try to click on the first

// element, click over here and I need to use a weight.

// And by the way, look at this await when I remove the click.

// A weight has no effect on this type of the expression.

// Why?

// Because locator is not a promise.

// Locator has a locator type.

// So that's why a weight is not needed when we just use a locator without any action method that returns

// a promise.

// Click is a promise locator is not.

// That's why here we need a weight and here we don't need to use a weight.

// So.

// And let me run it one more time and I will show you what happens when playwright returns a list of the

// web elements.

// So I run it.

// And we see the error message if I scroll a little bit down here.

// So playwright telling that error streak violation locator input result 20 elements.

// So playwright found 20 input elements on this web page and it was not able to click and also its look

// is providing us the different locator suggestions for each of the web elements, each of 20 elements

// that it found.

// But if we do something like first we say like, Hey, playwright, click for us on the very first input

// element that you have found, and we try to run it one more time.

// Yep.

// The very first input element is this one and it was successfully able to click.

// So let's quickly summarize what we did in this lesson.

// Locator is a general method in playwright that you can use to find a web elements on the web page.

// The syntax rules is for the tag name.

// You use just the name of the tag name for ID, you use a hash sign for the class, you use a dot notation

// Attributes should be in the square braces.

// If you want to combine the different web elements and different selectors, you just put them one by

// one.

// You can combine tags and attributes together.

// You can use also XPath.

// But this is not recommended way of finding elements in the playwright.

// And also you can use a text to find the web element using partial match or using the exact match locator

// method will always return all available elements that had a match for this particular element.

// And if it is not unique, playwright will not be able to act on this element in order to perform any

// action.

// Your element and your locator must be unique.
