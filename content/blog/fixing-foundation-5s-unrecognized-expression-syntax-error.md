---
title: Fixing Foundation 5’s Unrecognized Expression Syntax Error
date: "2014-10-13T22:12:03.284Z"
featuredImage: ./images/yeti-business-e1413211010350-1200x565.png
tags: ["troubleshooting", "jquery", "foundation"]
---

I was working on a new marketplace theme in Magento, and I kept getting a peculiar javascript error message. The exact error message that you might receive could vary – but the one I got was:

>Uncaught Error: Syntax error, unrecognized expression: [data-'Times New Roman'-dropdown]

Huh? What? But it was the version of Jquery (2.1.1) that I was using that was causing this error. After some poking around (i.e. disabling everything and re-enabling every js file piece by piece), I discovered that the source of this issue is from Foundation’s internal namespace.  If you set the namespace to be blank before you activate Foundation, the error goes away.

```js
Foundation.global.namespace = '';
$(document).foundation();
```

By setting the Foundation’s global namespace to be blank, Foundation won’t attempt to set it. I’m not sure why I got this error but doing this allowed me to keep working and hopefully you too.