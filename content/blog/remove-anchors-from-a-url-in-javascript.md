---
title: Remove Anchors from a Url in Javascript
date: "2008-08-08T22:12:03.284Z"
tags: ["javascript"]
---

Here is something useful that I discovered in my programming for my personal websites. I needed to strip out the anchor portion of a link and leave the rest of the url intact. For example I wanted:

> http://jelaniharris.com/I-love-apple-pies#comments

To look like:

> http://jelaniharris.com/I-love-apple-pies

## Splitting the url (string split)

```javascript
	//Grab our current Url
	var url = window.location.toString();
	//Remove anchor from url using the split
	url = url.split(“#”)[0];
```

It doesn’t get any easier than that. What this code does is grab the URL from the current window, and then splits the string where a ‘#’ is. Whether or not if the ‘#’ exists in the string, it’ll truncates the string up to the ‘#’ or return the whole url.

## Another way (Regex)

You could always use regex to replace the text AFTER the anchor with an empty string

```javascript
var url = window.location.href.replace(/#.*/, "");
```