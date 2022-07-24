---
title: How to add redirects to a Netlify site in Gatsby
date: "2022-07-24T13:05:00.000Z"
tags: ["netlify", "gatsby", "redirect"]
featuredImage: ./images/pexels-pixabay-258510.jpg
featuredAlt: "Photo by Pixabay: https://www.pexels.com/photo/railroad-tracks-in-city-258510/"
---

Previous this website was built in Wordpress, but now I've built it using Gatsby. In my migration to Gatsby I felt like I needed to change the url structure of the pages and not have any broken links.

On my old webhost I did this using .htaccess and just define my redirects in there. However, we're not running Apache anymore so there needed to be a solution.

Thankfully Netlify has an easy way to do this. 

## Create a _redirects file

On [this page](https://docs.netlify.com/routing/redirects/), Netlify defines how to setup the file to support redirects.

First step is to add this file to the published folder. Netlify will look for this file during the build process and setup your redirects for you. For myself, I have my Gatsby building the site into my /static folder which is the default.

1. Navigate to the static folder at the root of your Gatsby site. If you don't have a static folder at your root, you can make one.
2. Create a blank file with the name ```_redirects```. There is no extension on that file.

## Add urls to the redirect file

Now you need to open up the ```_redirects``` file and add the source and destination urls and the redirection method. Here is the format:

```
[Source Url] [Destination Url] [Redirect Method]
```

Like for example, my old website had a url structure like:

```
jelaniharis.com/2021/link-to-blog-post
```

My new url format is:
```
jelaniharris.com/blog/link-to-blog-post
```

So in my redirects file I could have have for a 301 redirect
```
/2021/link-to-blog-post /blog/link-to-blog-post 301
```

## But we could be smarter about it

Instead of putting every single page from my old blog as a new line in the _rewrites file we could use a ***splat*** or ***placeholder***

### Splats

[Splats](https://docs.netlify.com/routing/redirects/redirect-options/#splats) are an indicator that would match anything that follows after it. You can use the splats in the following way:

```
/blogs/* /content/:splat
```

Thus if you had a visitor to a ```sitename.com/blogs/2025/why-apples-arent-real``` Netlify would create a redirect to the page ```sitename.com/content/2025/why-apples-arent-real```

### Placeholders

[Placeholders](https://docs.netlify.com/routing/redirects/redirect-options/#placeholders) can be used on both the source and destination paths to match content from one side to another.

```
/artwork/:category/:month/:artist/* /:artist/:category/:splat 301
```

You also don't need to have a source placeholder exist on the destination placeholder (e.g. the :month field)

## There's an order to things (First Match Rule)

The redirect engine that is processing the redirects on Netlify only processes the first matching rule that it finds. So you need to order your more specific rules first, and then list the more general rules towards the bottom.

```
# This will redirect
/books/the-great-gatsby /curriculum/2022/the-great-gatsby

# This redirects all paths in books, except the one above (The Great Gatsby)
/books/* /archived-content/:splat

# This never triggers because the rule above it would trigger first
/books/zero-sum-game /curriculum/2020/zero-sum-game
```

## Bonus Tip

You can also check to see if your redirect rules parse correctly by using (Netlify's playground site)[https://play.netlify.com/redirects].

### My solution to my redirect problem

So to map my old blog urls ```jelaniharis.com/2021/link-to-blog-post``` to my new path ```jelaniharis.com/blog/link-to-blog-post```

So in my redirects file I have
```
/2013/:slug /blog/:slug 301
/2014/:slug /blog/:slug 301
/2021/:slug /blog/:slug 301
```

This allows me to map blog content from my year based pathing, into my new slug based paths for this website. 

> So why didn't I do a ```/:year/:slug /blog/:slug 301``` rule? That's because it would have matched too many other pages on my old site like ```jelaniharris.com/projects/apparatus``` to ```jelaniharris.com/blog/apparatus``` instead which is a problem.

I hope this helped!
