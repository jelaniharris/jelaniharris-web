---
title: Adding a delay to JQuery Functions
date: "2008-07-14T22:12:03.284Z"
tags: ["jquery", "javascript"]
---

Recently I was working on a few functions that I didn’t want to have activated immediately after hovered over a div. I neededthe functions to activate after a half a second of hovering by the user. To do this I created this this piece of code.

```javascript
var display_timeout = 0;
$(".orb_space").hover(function () {
 
		if(display_timeout != 0) {
				clearTimeout(display_timeout);
		}
 
                // save a reference to 'this' so we can use it in timeout function
		var this_element = this;
                display_timeout = setTimeout(function() {
				display_timeout = 0;
				// perform things with this_element here buy referencing it like $(this_element)
				if (!$(this_element).hasClass('magic')) {
					performRollinMagic();
				}
			}, 500);
 
	},
		function () {
			if(display_timeout != 0) {
				clearTimeout(display_timeout);
			}
			performRolloutStuff();
		}
);
```

Let’s go through line by line to see what’s happening here.

**Lines 2:** The [JQuery hover](http://docs.jquery.com/Events/hover) function has two parameters. The first parameter is for the function to call when the user hovers onto the element, and the second one is for when the user hovers out. Lines 4-16 consist of the first function and lines 19-24 consist of the second.

**Lines 4-6:** So if we happen to flash our mouse over the element very fast twice, this will make sure that we only have one timeout function happening.

**Line 9:** When we in the [setTimeout](http://www.w3schools.com/js/js_timing.asp) function we need to remember a reference to our current element so that we don’t have to do some tricky DOM navigation to get the hover activated element with the setTimeout event. It’s just easier to just make a variable to remember the element.

**Lines 11-15:** First we reset the display_timeout variable, and then we can perform our necessary hover actions in this setTimeout function. The 500 indicates that we want this function to occur after 500ms.

**Lines 20-23:** This looks very familiar doesn’t it? It’s the same thing from lines 4-6\. This is so that if the user rolls out of the hover element, the timer countdown will immediately stop and the hoverin functions will not occur.

