---
title: How to add a post series to a gatsby blog
date: "2023-05-21T14:40:00.000Z"
tags: ["gatsby"]
featuredImage: ./images/pexels-wanchai-thiantanawat-10303486.jpg
featuredAlt: "Photo by Min An"
featuredAltUrl: "https://www.pexels.com/photo/red-and-white-roller-coaster-on-railings-749061/"
series: gatsby
seriesOrder: 2
draft: true
---

One of the most important features that I wanted to add to my custom blog was the ability to group a bunch of blog posts into a series. 

In gatsby-config.js add: 
```js
module.exports = {
  siteMetadata: {
    ...
  },
  plugins: [
    ...
    `gatsby-transformer-json`,
  ]
}
```

In gatsby-node.js:
```js
const seriesResult = await graphql(
    `
      {
        allSeriesJson {
          nodes {
            endDate
            slug
            startDate
            title
            description
            id
          }
        }
      }
    `
  )

  if (seriesResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog series`,
      seriesResult.errors
    )
    return
  }

  const series = seriesResult.data.allSeriesJson.nodes
  const seriesData = new Map()
  await Promise.all(
    series.map(async (serie, index) => {
      const seriesPosts = await graphql(
        `
          query PostsInSeries($slug: String!) {
            allMarkdownRemark(
              sort: { frontmatter: { seriesOrder: ASC } }
              filter: {
                fields: { released: { eq: true } }
                frontmatter: { series: { slug: { eq: $slug } } }
              }
              limit: 1000
            ) {
              nodes {
                id
                fields {
                  slug
                  released
                }
                frontmatter {
                  series {
                    title
                    slug
                    description
                    startDate
                    endDate
                  }
                  seriesOrder
                }
              }
            }
          }
        `,
        { slug: serie.slug }
      )

      if (seriesPosts.errors) {
        reporter.panicOnBuild(
          `There was an error loading posts in series`,
          seriesPosts.errors
        )
        return
      }

      if (seriesPosts && seriesPosts.data) {
        seriesData.set(serie.slug, seriesPosts.data.allMarkdownRemark.nodes)
      }
    })
  )
```

In the blog post generation part add the information about the series for each blog post
```js
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { frontmatter: { date: ASC } }
          filter: { fields: { released: { eq: true } } }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
              released
            }
            frontmatter {
              series {
                id
                title
                slug
                description
                startDate
                endDate
              }
              seriesOrder
            }
          }
        }
      ...
      }
    `)

```

And when we're creating the posts themselves:
```js
const posts = result.data.allMarkdownRemark.nodes
// Create blog posts pages
  if (posts.length > 0) {
    await Promise.all(
      posts.map(async (post, index) => {
        let previousSeriesPostId = null
        let nextSeriesPostId = null

        // If a series exist
        if (
          post.frontmatter.series &&
          post.frontmatter.series.slug &&
          seriesData.has(post.frontmatter.series.slug)
        ) {
          let seriesInfo = post.frontmatter.series
          const seriesList = seriesData.get(seriesInfo.slug)

          let seriesIndex = post.frontmatter.seriesOrder - 1

          previousSeriesPostId =
            seriesIndex <= 0 ? null : seriesList[seriesIndex - 1].id
          nextSeriesPostId =
            seriesIndex === seriesList.length - 1
              ? null
              : seriesList[seriesIndex + 1].id
        }

        return createPage({
          path: post.fields.slug,
          component: blogPost,
          context: {
            id: post.id,
            previousSeriesPostId,
            nextSeriesPostId,
          },
        })
      })
    )
  }

```

Then when creating the types we want to add the series that we're parsing from json:

```js
  createTypes(`
    ...

    type SeriesJson implements Node {
      title: String!
      description: String!
      slug: String!
      startDate: Date @dateformat
      endDate: Date @dateformat
      posts: [MarkdownRemark] @link(by: "frontmatter.series.slug", from: "slug")
    }

    type Frontmatter {
      ...
      series: SeriesJson @link(by: "slug")
      seriesOrder: Int
    }
    ...
  `)
```

In blog-post.js or in your template for blog posts:
```js
export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $previousSeriesPostId: String
    $nextSeriesPostId: String
  ) {
    ...
    markdownRemark(id: { eq: $id }) {
      ...
      frontmatter {
        ...
        series {
          id
          startDate
          title
          endDate
          description
        }
        seriesOrder
        ...
      }
    }
    ...
    previousSeries: markdownRemark(id: { eq: $previousSeriesPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 300)
          }
        }
      }
    }
    nextSeries: markdownRemark(id: { eq: $nextSeriesPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 300)
          }
        }
      }
    }
  }
`
```