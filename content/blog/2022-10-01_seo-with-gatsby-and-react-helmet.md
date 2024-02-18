---
title: SEO with Gatsby and React-Helmet
date: "2022-10-01T22:31:00.000Z"
tags: ["nextauth", "nextjs"]
featuredImage: ./images/pexels-pixabay-267350.jpg
featuredAlt: "Photo by Pixabay"
featuredAltUrl: "https://www.pexels.com/photo/close-up-photography-of-smartphone-icons-267350/"
draft: true
preview: false
---

React-Helmet is a way of managing all of the changes that are made to the head of an HTML document. With this component you can control the head using their react component. This allows you to add attributes to their component that will be added to the static HTML pages that Gatsby generates.

React-Helmet features all of the tags used in the head tag like `title`, `base`, `meta`, `link`, `script`, `noscript`, and `style` tags.

How to install React-Helmet for Gatsby
In your main gatsby directory just run this command to install react-helmet and react-helmet gatsby
```
npm install gatsby-plugin-react-helmet react-helmet
```

Then just add the plugin into your plugins array in `gatsby-config.js`
```
plugins: [`gatsby-plugin-react-helmet`]
```

I prefer having my Helmet object wrapped into another object so that I can control the usage of it. I created a `seo.js` file 


