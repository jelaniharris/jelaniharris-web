---
title: "Setting a variable value as an object key in Javascript"
date: "2024-08-17T22:31:00.000Z"
modified_date: "2024-10-13T20:24:00Z"
tags: ["javascript"]
description: "You sometimes may find yourself needing to assign an attribute to an object based off the value of another variable. I show you the easiest way."
featuredImage: ./images/pexels-pixabay-39389.jpg
featuredAlt: "Photo by Pixabay from Pexels"
featuredAltUrl: "https://www.pexels.com/photo/brass-ornate-vintage-key-on-black-computer-keyboard-39389/"
---

In Javascript, you sometimes may find yourself needing to assign an attribute to an object based off the value of another variable.

There are currently two ways of doing this:

## What’s the old way? (Pre ES6)

The old way that you used to do this was to make the object first and then use bracket notation (`[]`) to set it.

```tsx
var wantedKey = "timesJumped"
var person = {}

person[wantedKey] = 250
console.log(person) // Will output {"timesJumped": 250}
```

## The new ES6 way to assign an object key

In ECMAScript 2015, the syntax to initialize objects now also supports [Computed Property Names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names). So now you can put your expression into brackets and it will be used as the property name.

```tsx
var wantedKey = "moneyCarried"
var person = { [wantedKey]: 1500 }
console.log(person) // Should output {"moneyCarried": 1500}
```
