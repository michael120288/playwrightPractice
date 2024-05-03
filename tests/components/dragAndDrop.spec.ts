import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
});

test("drag and drop", async ({ page }) => {
  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
  await frame.locator('li', {hasText:'High Tatras 2'}).dragTo(frame.locator('#trash'))

  //more presice way
  await frame.locator('li', {hasText:'High Tatras 4'}).hover()
  await page.mouse.down()
  await frame.locator('#trash').hover()
  await page.mouse.up()

  await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])

})
/*
And in this lesson we will talk about drag and drops and iframes.

So this is another test application that we're going to use for this class.

It's global demo site, drag and drop.

So here is the example.

We have four images in this photo manager and we can simply drag and drop those photo images here to

the right.

And in this lesson we will automate this functionality.

Also, this application has an iframes and I will show you how to deal with the iframes in the playwright.

So going back to our framework and since this is a new test application, I will create a new spec file

just for this demo.

Okay, so I have set up a new test.

And first thing, let's navigate to a new website.

All right.

So now going back to application and let's say I want just to click on this second image, which is

high tatras to I make a right click inspect and I can see that this is list item that has a text has

tatras to.

So let me try to create the locator for that and click on that and see what happens.

Await page dot locator.

This is Li that has text and text is high tatras to.

Okay.

And I will perform a click.

And let me run the test.

So test application is open successfully, but we see that it's still running the test.

It's not able to actually perform the click and it should fail within 30s because this is a time out.

All right.

Test failed.

And let's look here.

So it was try to find this element but was not able to and browser closed because of the timeout.

So why did this happen?

Make a right click inspect and if I scroll up into the Dom we have an iframe.

So this entire section which is highlighted right now in the screen located inside of the iframe.

What is iframe?

iFrame is a kind of embedded HTML document inside of the existing HTML document.

So it's a kind of a website inside of the website and you can tell that by HTML code and body.

So every HTML website has only a single body and every HTML web page begins with just a single HTML.

But we have a second HTML.

So this is kind of a page inside of the page and playwright is not able to find our web element because

it is inside of the iframe.

It's not visible.

So in order to get access to this area and find this high tatras two locator, first we need to switch

into this iframe and then within this iframe find the locator that we are looking for.

So going back to framework.

And let's create a frame locator.

I type const frame equals to page dot and I call a method frame locator.

Now I need to provide a locator for our iframe going back.

So what we can use is, for example, this attribute, which is kind of unique.

So we can use this attribute photo manager and then within this attribute find the iframe.

So going back.

I type title for the manager space and then I frame this will be a key to our iframe.

And then in order to get access to the web element inside of the iframe, now we call frame dot locator

Li and then perform a click.

So this is how it works.

Let me run this one more time.

And now it works just fine.

We can see the test pass successfully.

So right now we perform the click, but click didn't make anything.

What we actually want to do, we want to perform a drag and drop for this web element.

So we want to take high tatras and move it to the right.

Okay, so let's do this right click inspect.

We need to find the locator for the area where we actually want to drop the element.

And here we go.

We have a unique identifier, which is ID trash, and we will use this going back.

So now instead of the click, I will use method called drag to.

And inside of this method I need to provide a locator where I want to drop my element and again I type

frame because we're working inside of the iframe locator and provide ID which is trash.

Okay.

And run this test one more time.

Yeah, you can see it worked perfectly fine.

We were able to move the high tatras to image, drag and drop performed successfully.

And let me show you a second example of more precise control if you need it.

Controlling the mouse, performing drag and drop more pre size control.

Let's say this time we want to drag and drop the second item, which is high Tatras four and we can

take the existing locator.

So take this high Tatras two and instead of high tatras two, we do a four.

And the first step, we want to hover over the mouse above the element that we want to drag and drop

the next step and wait.

Page dot mouse, and we need to call a down method in order to click the mouse above this element.

The next step we need to move a mouse into the direction where we want to drop our element.

And I call frame dot locator trash.

And perform hover one more time.

And then the last step we need to release a mouse button, a wait page, dot, mouse, dot up.

That's it.

So let's run this test.

And we can see that two elements were drag and drop successfully to the right.

So the second approach worked as well.

And the last step, let's make an assertion that both of those elements located inside of the drop location.

So let's go back and find out.

The elements, how it's structured.

So we have Lee and.

We are looking for this H5 tag.

Right?

So each li represents the item inside of the area where it is located and it has H5 tag.

So what we need to do is to find both H5 tags that represent a text.

It will return us an array of the texts inside of this box, and we will assert that both of those texts

exist inside of this box.

So going back.

Await expect.

And I provide the locator frame.

Dot locator.

So first we find a trash, then child element.

Li And another child element.

H five.

And I want to make sure that it have text.

And it should be two values array with the two values.

First value will be high tatras.

Two.

And the second value will be high tatras for.

And running this test one more time.

Drag and drop successful and assertion passed successfully.

All right.

So let me quickly summarize what we did in this lesson.

When you look for the locators on the Web page, and if sometimes those locators do not work, check

for the iFrame on the web page.

Sometimes it can be a reason why you cannot locate the web element.

In order to interact with the iframe, you need to switch to this iframe first, providing a frame locator

of this iframe.

Then using this frame locator, you can find the locators within the iframe and work as usual.

If you want to perform drag and drop on the web page, use a drag to method and provide the locator

where you want to drop the element.

If you want to perform more precise control over the drag and drop, you can use a mouse.

Movements using methods hover up and down to perform drag and drop.

And for the assertion we used a locator assertion and validated that both of the elements located in

the desired location.
*/
