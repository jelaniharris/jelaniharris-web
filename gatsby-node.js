const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

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

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogTag = path.resolve(`./src/templates/blog-tag.js`)

  // Get all markdown blog posts sorted by date
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
        tagsGroup: allMarkdownRemark(
          filter: { fields: { released: { eq: true } } }
          limit: 2000
        ) {
          group(field: { frontmatter: { tags: SELECT } }) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

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

        // Get the previous and nextpost ids
        const previousPostId = index === 0 ? null : posts[index - 1].id
        const nextPostId =
          index === posts.length - 1 ? null : posts[index + 1].id

        return createPage({
          path: post.fields.slug,
          component: blogPost,
          context: {
            id: post.id,
            previousPostId,
            nextPostId,
            previousSeriesPostId,
            nextSeriesPostId,
          },
        })
      })
    )
  }

  // Create blog tag pages
  const tags = result.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `/blog/tag/${_.kebabCase(tag.fieldValue)}/`,
      component: blogTag,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField, create } = actions
  const MD_TYPE = "MarkdownRemark"
  const forcePublish = process.env.NODE_ENV === "development"

  if (node.internal.type === MD_TYPE) {
    const slug = createFilePath({ node, getNode })
    // /blog/2022-09-27_creating-pwa-nextjs

    const uniqueid = path.basename(node.fileAbsolutePath, ".md")
    const separtorIndex = ~slug.indexOf("_") ? slug.indexOf("_") : 0
    const shortSlugStart = separtorIndex ? separtorIndex + 1 : 0

    let isReleased = false
    if (forcePublish || (node.frontmatter && !node.frontmatter.draft)) {
      isReleased = true
    }

    if (separtorIndex) {
      createNodeField({
        name: `slug`,
        node,
        value: `/blog/${slug.substring(shortSlugStart)}`,
      })
    } else {
      createNodeField({
        name: `slug`,
        node,
        value: slug,
      })
    }

    createNodeField({
      name: `uniqueid`,
      node,
      value: uniqueid,
    })

    createNodeField({
      name: `released`,
      node,
      value: isReleased,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions

  createFieldExtension({
    name: "defaultFalse",
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return false
          }
          return source[info.fieldName]
        },
      }
    },
  })

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      title: String
      author: Author
      description: String
      keywords: [String]
      siteUrl: String
      imageUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type SeriesJson implements Node {
      title: String!
      description: String!
      slug: String!
      startDate: Date @dateformat
      endDate: Date @dateformat
      posts: [MarkdownRemark] @link(by: "frontmatter.series.slug", from: "slug")
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      featuredImage: File @fileByRelativePath
      featuredAlt: String
      featuredAltUrl: String
      tags: [String]
      series: SeriesJson @link(by: "slug")
      seriesOrder: Int
      draft: Boolean @defaultFalse
      preview: Boolean @defaultFalse
    }

    type Fields {
      slug: String
      released: Boolean @defaultFalse
    }
  `)
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
    },
  })
}
