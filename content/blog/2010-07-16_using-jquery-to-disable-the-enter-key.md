---
title: Using Jquery to disable the enter key
date: "2010-07-16T22:12:03.284Z"
tags: ["jquery"]
featuredImage: ./images/pexels-unseop-kang-8855545.jpg
featuredAlt: "Photo by Unseop Kang"
featuredAltUrl: "https://www.pexels.com/photo/close-up-of-enter-key-on-keyboard-8855545/"
---

There are times that you do not want a form to automatically submit when a user hits the enter key. Or if you want to do some validation via javascript before you allow the submit to go through.

```js
//Bind this keypress function to all of the input tags
$("input").keypress(function (evt) {
//Deterime where our character code is coming from within the event
var charCode = evt.charCode || evt.keyCode;
if (charCode  == 13) { //Enter key's keycode
return false;
}
});
```

By returning false in the keypress function it tells the browser not to allow the enter key event.