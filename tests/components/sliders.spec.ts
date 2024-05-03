import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test('test sliders', async ({ page }) => {
  //update attribute
  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
  await tempGauge.evaluate(node=>{
    node.setAttribute('cx','232.630')
    node.setAttribute('cy','232.630')
  })
  await tempGauge.click()

  //Mouse movement
  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  await tempBox.scrollIntoViewIfNeeded()

  const box = await tempBox.boundingBox()
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x + 100, y)
  await page.mouse.move(x+100, y +100)
  await page.mouse.up()
  await page.pause()
  await expect(tempBox).toContainText('30')
})
/*
And in this lesson we will talk about sliders, how to automate these type of web elements.

So we are on the home page of test application and here we have this nice temperature gauge that we

can change by moving mouse left and right and moving mouse around the circle.

So how to automate this type of the web elements When you can click the mouse on this gauge, then move

it to any direction and then validate the new result after this change.

So there are two options how to do that and let me show you those.

So going back to the framework and create a new test.

So the first approach how you can interact with sliders is just updating the slider attribute.

So update entry.

But and let me show you what I mean.

So going back to application, make a right click on this pin inspect and look here.

So when I move this slider left and right, let me scroll a little bit up.

When I move it left and right, you can see that in the Dom there are two attributes C, X and C, y

that are updated.

Those C, x and C are the x and Y coordinates in pixel for the location of our web element.

So technically we can just update the desired coordinates of this web element and it should work without

actual simulation of moving the mouse.

So this is a kind of the shortcut and let me show you how to do that.

So let's say we want to put our slider into the maximum position, right here, and then we want to

validate that 30°C is displayed right here.

So we begin with identifying the locator for this particular circle.

So let's scroll this up and let's see what we have.

So we have this temperature dragger.

This defines the box for the entire web element.

And also this guy is located inside of the temperature tab.

If we collapse it, we have two tabs, humidity and temperature.

This one humidity and this one is temperature.

And each of those have those temperature dragger.

And inside of the dragger, there is this circle tag.

And inside of this circle tag, we can get access to two of these attributes to modify them.

So first of all, let's create the locator for this circle.

So we take this attribute.

Tap title temperature.

Temp gauge equals to page dot locator.

So first we want to find this particular tab.

Then the child element would be this temperature dragger.

And then within this element, we want to find our circle.

Circle.

All right, that's done.

Now, how to get access to those key and key attributes and update them.

We need to perform evaluation of the JavaScript expression await temp gauge and I call the command evaluate

inside of the evaluate.

I create the callback function and then let's say call it node like node JS.

And then inside of this function I code node and then call set attribute inside of the set attribute,

I need to provide the attribute name, which is c x.

And the attribute value that they want to set.

I put just this first part of it.

So and the same thing we need to do for the CI ci and the value will be, I assume, exactly the same.

Yeah, the value is the same.

So that's it.

Let's run this and see what happens.

All right.

So let me make it bigger and look what happened.

The actual gauge moved down, but the value did not update it.

So it's kind of broken.

UI looks right now this happens because we updated the property.

We physically changed the position of the UI element, but we didn't trigger the event of this change.

So that's why browser did not react on this change.

So now we need just to trigger any command to this particular web element to trigger the event to happen

and reflect the change on the UI.

So let's do this.

And I type a wait dem gauge dot click.

Let's just make a single click on our gauge and I run this test again.

And right now, you see, it's worked perfectly fine.

First we move the location of the gauge, then made the click and it is reflected at 30 Celsius on this

gauge.

But this is kind of a shortcut how you can update the value of the sliders.

The second approach, more real one, is to simulate the actual mouse movement to change the value of

the gauge.

So let me show you how to make the actual mouse movement in the playwright.

Closing this and showing the second example,

mouse movement.

So we begin with locator.

This is our test application.

And first of all, we need to define the area where we want to move our mouse.

And I think the good candidate would be this.

So if we take this NG temperature dragger and use this box as the area where we want to move the mouse,

this locator would work for us because let me show you something.

We can move this gauge not only by moving the mouse exactly at the line of this gauge.

We can also put, for example, mouse right here.

And if we move it to the right or to the left or up and down, this gauge also is reacting.

It means that if we move our mouse within this box of this gauge, it also create the reaction of this

gauge that we want.

So this is what we want to simulate.

And first of all, we need to create a locator that will define this box and we will take this NG temperature

dragger.

So I just take the locator from the previous example, remove the circle from it and rename it instead

of temp gauge.

Temp box.

The next step.

I'll comment out this code before writing the code to move the mouse, you need to make sure that the

area where you going to move your mouse is completely in the view of the browser.

So that's why we need kind of a scroll down this section a little bit down to make sure that this entire

view located in the browser view.

That's why we will call the method await them box and we will use method scroll into view if needed.

So this method will make sure that our page scroll down appropriately and this entire box is displayed

on the page.

The next step we need to define a bounding box, await box dot bounding box and what is bounding box.

So let me visualize it for you.

So here is our web element that we define temperature, dragger and this temperature dragger is nothing

but a box 300 by 300 pixels.

When you call a method bounding box for this particular web element, playwright creates a coordinates

around this bounding box with X and Y coordinates which start in the top left corner.

X coordinates are horizontal coordinates and y coordinates are vertical coordinates, and the top left

corner has a coordinates, zero and zero by pixels.

And for example, if you want to put your mouse pointer down to 100 pixels, you define like this x

is zero pixels and Y is 100 pixels and your mouse will move down to this point.

Or if you want to move mouse somewhere here, for example, you define okay, I want to move the mouse

100 pixels to the right on the x coordinates and 50 pixels down on the Y coordinates and your mouse

pointer will be located right here.

And also keep in mind that you are not limited by this bounding box.

You can go outside of this bounding box.

This is just a starting point for you to move the mouse around.

And if you want to move your pointer somewhere outside of the bounding box, you just provide the negative

values.

For example, here we are saying X is equal 100, but y is -50 pixels and your mouse pointer moved above

the bounding box, closer to the temperature area.

The only limit that you have moving the mouse around is the actual browser view.

That's why important to scroll the browser view to the area where you want to interact with before you

begin moving the mouse.

Okay, so we're going back and now let's interact with our bounding box.

First, we assign the result of this bounding box.

Const box equals to await ten box bounding box.

And now we can access the coordinates of this bounding box using just dot notation, for example, box

dot x or box dot y and so on.

Also, there is a little trick that I want to show you for us for our convenience.

It would be better if we will use a center of the box as our starting point instead of using a top left

corner of the box because we want to move a mouse somewhere here.

Right?

We want to move it to the right or to the left and then down over here or over here so we can define

the center of our bounding box and use it as our starting point.

So let's do this.

We can use a simple math formula X first.

I define my beginning X coordinates like box dot x plus box dot width divided by two and second const

y equals box dot y plus box dot height divided by two.

And this way we created a starting coordinates of our bounding box in the center of our bounding box.

And right now we can start moving the mouse from the center of the box.

So let's do this.

Await.

Page, dot, mouse, dot.

Move X and Y.

So the first action, I am putting my mouse cursor to the location where I want to start from.

Second, I want to click the mouse button to begin movement and I put await page, dot, mouse dot down.

So this simulates a click of the left key button on the mouse on these coordinates.

The next step we want to move our mouse to the right.

Await page, dot, mouse, dot, move.

And now we update the desired coordinates.

So moving to the right, it means x plus, let's say 100 pixels and y coordinates are remains the same

because I just want to move horizontally.

The next step we want to move mouse down after that await page, dot, mouse, dot move.

And then I keep my coordinates the same and add the coordinates moving down plus another 100 pixels.

So with this command, we move the mouse down from this point.

And then the last step after we completed the movement, we need to release the mouse button.

Page, dot, mouse, dot up.

That's it.

So we completed the movement and let's run this and see how it works.

Yeah.

So it moved the mouse to the right but didn't move it completely down.

So let's see.

Uh huh.

Okay.

We made a mistake here.

Not X plus 100.

We need Y plus 100.

Okay.

We need to move it down.

We didn't do it.

So let's run this one more time.

Okay.

And now it moves successfully.

So you can see that it moved the mouse all the way to the right.

And if I want to change it to a zero, I just move my mouse to the left.

100 pixels and then move it down to 100 pixels and it should move our mouse all the way down to the

left.

Okay.

And now it's selected 12 Celsius.

It moved it almost all the way down.

So yeah, it was almost there.

So that's it.

That's the main logic behind how moving the mouse let me put it back how it was and the last step.

We just need to make an assertion, a wait, expect.

The box to contain text.

30.

Running this one more time.

Okay.

I think it's past, so let me run it visually.

Yeah.

And Tess worked assertion passed successfully.

So let me quickly summarize what we did in this lesson.

You have two ways how you can move the sliders on the web page.

Approach number one is simply updating HTML attributes that are responsible for coordinates of this

web element.

In order to do that, you need to use evaluate expression and then set the values of the desired coordinates.

Then you need to trigger action on this web element in order to trigger the event to make this change.

The second approach is using the actual mouse movement.

You need to define a bounding box of the area where you want to start with bounding box.

Always start on the top left corner of the box with initial coordinates.

You can also get the center of your bounding box using this simple formula and then simply move the

mouse around the screen, triggering the mouse commands and providing x and y coordinates to your mouse

movement.
*/
