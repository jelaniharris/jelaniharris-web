---
title: Changing the pointer into the hand cursor in AS3
date: "2010-12-01T14:19:00.000Z"
tags: ["as3", "flash"]
---

One of the problems that I ran into while migrating from Actionscript 2 (AS2) to ActionScript 3 (AS3) was the fact that not only was setting a mouse event of a MovieClip different, so does how the mouse cursor acts.

In AS2, setting the onPress event for a MovieClip would automatically cause the cursor to switch the hand whenever you hovered over the element. However in AS3 I discovered that in order to get the same functionality it has to be done manually to get the same effect:

```javascript
//These are properties of the MovieClip class
targetMc.buttonMode = true;
targetMc.useHandCursor = true;
```

Upon discovering this bit of code, I noticed that I had already created more than a dozen of clickable instances that could use this code and not all of them had classes for them. I had searched for some kind of global variable that I could set to see if I could get this working with all of them the easy way. Alas, I came up with nothing. So instead I decided to create a base class to implement this functionality for me.

```javascript
import flash.display.MovieClip
 
package com.jelaniharris {
     class ButtonMovieClip extends MovieClip {
          //Override the default constructor and make this movieclip indicate it's a button to the user
          public function ButtonMovieClip (): void {
               this.buttonMode = true;
               this.useHandCursor = true;
          }
     }
}
```

Then all I needed to do was to go to my library and set the Base Class of all of my button-like elements to the ButtonMovieClip class.

I hoped this helped someone out there.