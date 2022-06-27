---
title: Sticky Sidebar in React
date: "2022-06-23T19:19:00.000Z"
tags: ["react", "css"]
featuredImage: ./images/pexels-photo-302163.webp
featuredAlt: "Photo by Pixabay from Pexels: https://www.pexels.com/photo/art-blur-color-delicious-302163/"
---

## How to do it

Now you could use something like [react-sticky](https://www.npmjs.com/package/react-sticky) to do something like this, but it's so much easier to just define your sidebar using css.

```css
#sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
```

You can change the top position to be any amount that would include your fixed header if you wanted to.