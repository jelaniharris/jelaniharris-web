---
title: How to check if a jquery plugin is installed or available
date: "2012-06-11T22:12:03.284Z"
tags: ["jquery"]
featuredImage: ./images/greg-rakozy-vw3Ahg4x1tY-unsplash.jpg
featuredAlt: "Photo by Greg Rakozy"
featuredAltUrl: "https://unsplash.com/@grakozy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
---

Most Jquery plugins act a lot like functions. They are attached to the main Jquery object, so essentially all we have to do is check that the function exists and is defined.

```js
if ($.pluginFunction) {
  // Function exists, do your plugin stuff here.
} else {
  // Plugin does not exist, use alternatives or do nothing in here.
}
```