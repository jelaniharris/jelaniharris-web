---
title: SEO with Gatsby and React-Helmet
date: "2024-02-19T03:11:57Z"
tags: ["gatsby", "react", "react-helmet"]
featuredImage: ./images/pexels-mixu-1323208.jpg
featuredAlt: "Photo by MIXU"
featuredAltUrl: "https://www.pexels.com/photo/black-half-faced-helmet-on-gray-concrete-wall-1323208/"
series: gatsby
seriesOrder: 2
---

React-Helmet is a way of managing all of the changes that are made to the head of an HTML document. With this component you can control the head using their react component. This allows you to add attributes to their component that will be added to the static HTML pages that Gatsby generates.

React-Helmet features all of the tags used in the head tag like `title`, `base`, `meta`, `lang`, `link`, `script`, `noscript`, and `style` tags.

How to install React-Helmet for Gatsby
In your main gatsby directory just run this command to install react-helmet and react-helmet gatsby
```bash
npm install gatsby-plugin-react-helmet react-helmet
```

Then just add the plugin into your plugins array in `gatsby-config.js`
```bash
plugins: [`gatsby-plugin-react-helmet`]
```

I prefer having my Helmet object wrapped into another object so that I can control the usage of it. I created a `seo.js` file 

```javascript
const Seo = ({ description, lang, meta, title, image, pageKeywords, ogType, article, url}) => {
  ...
})
```

Inside of that seo container, I run a query to get the basic details about my site:
```javascript
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
            siteUrl
            imageUrl
            author {
              name
            }
            social {
              twitter
            }
          }
        }
      }
    `
  )
```

Then inside the container, I conditionally use the site data as backup if the attributes that I'm using from the parameters do not exist:
```javascript
  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;
  const author = site.siteMetadata?.author?.name;
  const siteImage = image || {width: 941, height: 529, src: `${site.siteMetadata.siteUrl}${GenericLogo}`};
  const keywords = pageKeywords || site.siteMetadata.keywords;
```

Once I have some basic variables set up, then I export the Helmet component by:
```javascript
  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      link={[...]}
      meta={[...]}
      ...
    />
  )
```

Then to use the Seo component, for a relatively static page:
```javascript
  <Layout>
    <Seo title="All blog posts" />
  </Layout>
```

For one of my dynamically generated blog pages I use:
```javascript
<Layout>
  <Seo
    title={post.frontmatter.title}
    description={post.frontmatter.description || post.excerpt}
    ogType="article"
    pageKeywords={tags}
    url={`${data.site.siteMetadata.siteUrl}${post.fields.slug}`}
    article={[
      {
        property: `article:published_time`,
        content: post.frontmatter.date,
      },
      {
        property: `article:modified_time`,
        content: post.frontmatter.modified_date || post.frontmatter.date,
      },
    ]}
  />
</Layout>
```

### Metadata

Adding metadata to your helment component is really easy. You just add props and content to an array:
```javascript

  let articleData = []
  if (article) {
    articleData = article;
  }

  return (
    <Helmet
      meta={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:image`,
          content: siteImage.src
        },
        {
          name: `og:url`,
          content: url,
        },
      ].concat(meta, articleData)}
    />
  )
```

This is how you can setup your open graph, facebook, and twitter metatags. I'm adding another array from article data to allow invidual blog posts to set additional meta tags

### Favorite Link Icons

To handle the favicons, you can define the link in the helmet component as an array of icon objects:

```javascript
  import FavIcon64x64 from '../images/favicon-64x64.png'
  import FavIcon32x32 from '../images/favicon-32x32.png'
  import FavIcon16x16 from '../images/favicon-16x16.png'
  ...

  return (
    <Helmet
      link={[
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: FavIcon16x16
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: FavIcon32x32
        },
        {
          rel: "shortcut icon",
          type: "image/png",
          href: FavIcon64x64
        }
      ]}
    />
  )
```

### Handling the title

The way that I'm handling the title is a little different. I check to see if the title is the homepage and if it is then I use the defaultTitle from the gatsby config, otherwise I use the page title with the site name at the end.
```javascript
  let pageTitle = title;
  let titleTemplate = null;
  if (title === "Home") {
    titleTemplate = defaultTitle;
    pageTitle = defaultTitle;
  } else {
    titleTemplate = defaultTitle ? `%s | ${defaultTitle}` : null;
  }
```
```javascript
  return (
    <Helmet
      title={pageTitle}
      titleTemplate={titleTemplate}
    />
  )
```

So then when I define the title of a blog post, it will show up as **Blog Post Title | Jelani Harris** which is the seo that I want for my pages.
