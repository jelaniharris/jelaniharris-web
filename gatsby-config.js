const { documentToHtmlString } = require("@contentful/rich-text-html-renderer")

require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Jelani Harris`,
    author: {
      name: `Jelani Harris`,
      summary: `who lives and works in Wisconsin building useful things, and thinks that pineapple on pizza is an acceptable choice.`,
    },
    description: `A place of all things Jelani Harris`,
    keywords: ["programming", "coding", "developer", "full-stack"],
    siteUrl: `https://jelaniharris.com`,
    imageUrl: `/static/images/logo.png`,
    social: {
      twitter: `@jelaniharris`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
        host: process.env.CONTENTFUL_HOST_URL,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
              buildTime(formatString: "YYYY-MM-DD")
            }
            allSitePage {
              nodes {
                path
              }
            }
            allMarkdownRemark(
              filter: { fields: { released: {eq: true}}}
            ) {
              nodes {
                id
                fields {
                  slug
                  released
                }
                frontmatter {
                  date
                }
              }
            }
            allContentfulBlogPost(
              sort: {createdAt: DESC}
            ) {
              nodes {
                id
                fields {
                  slug
                }
                createdAt
              }
            }
          }
        `,
        resolveSiteUrl: () => "https://jelaniharris.com",
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMarkdownRemark: { nodes: allPosts },
          allContentfulBlogPost: { nodes: allContentfulPosts },
        }) => {
          let pages = []

          allPages.map(page => {
            pages.push({
              path: page.path,
            })
          })

          allPosts.map(post => {
            pages.push({
              path: post.fields.slug,
              date: post.frontmatter.date,
            })
          })

          allContentfulPosts.map(post => {
            pages.push({
              path: post.fields.slug,
              date: post.createdAt,
            })
          })

          return pages

          /*const wpNodeMap = allMarkdownRemark.reduce((acc, node) => {
            const { uri } = node.fields.slug
            acc[uri] = node

            return acc
          }, {})

          return allPages.map(page => {
            return { ...page, ...wpNodeMap[page.path] }
          })*/
        },
        serialize: ({ path, date }) => {
          let entry = {
            url: path,
            changefreq: "weekly",
            priority: 0.5,
          }

          if (date) {
            entry.priority = 0.7
            entry.lastmod = date
          }

          return entry
        },
      },
    },

    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        setup: ({ query: { site } }, options) => ({
          ...options,
          title: `${site.siteMetadata.title} Blog: RSS Feed`,
          description: site.siteMetadata.description,
          site_url: site.siteMetadata.siteUrl,
          feed_url: `${site.siteMetadata.siteUrl}/rss.xml`,
          image_url: `${site.siteMetadata.siteUrl}/static/logo.png`,
          managingEditor: site.siteMetadata.author.name,
          webMaster: site.siteMetadata.author.name,
          copyright: `©2008 - ${new Date().getFullYear()} ${
            site.siteMetadata.title
          }, All Rights Reserved.`,
          language: `en`,
          generator: `GatsbyJS`,
          custom_namespaces: {
            webfeeds: "http://webfeeds.org/rss/1.0",
          },
          custom_elements: [
            {
              "webfeeds:cover": {
                _attr: {
                  image: `${site.siteMetadata.siteUrl}${site.siteMetadata.imageUrl}`,
                },
              },
            },
            {
              "webfeeds:icon": `${site.siteMetadata.siteUrl}/static/favicon.png`,
            },
            {
              "webfeeds:logo": `${site.siteMetadata.siteUrl}/static/favicon.png`,
            },
            { "webfeeds:accentColor": "1abc9c" },
            {
              "webfeeds:related": {
                _attr: {
                  layout: "card",
                  target: "browser",
                },
              },
            },
          ],
        }),
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                imageUrl
                site_url: siteUrl
                author {
                  name
                }
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMarkdownRemark, allContentfulBlogPost },
            }) => {
              const allContent = []

              
              allContentfulBlogPost.nodes.forEach(node => {
                allContent.push({
                  title: node.title,
                  author: site.siteMetadata.author.name,
                  description: node.description?.description ?? '',
                  date: node.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [
                    {
                      "content:encoded": documentToHtmlString(
                        JSON.parse(node.content.raw)
                      ),
                    },
                  ],
                })
              })

              allMarkdownRemark.nodes.forEach(node => {
                allContent.push(
                  Object.assign({}, node.frontmatter, {
                    description: node.excerpt,
                    date: node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + node.fields.slug,
                    guid: site.siteMetadata.siteUrl + node.fields.slug,
                    custom_elements: [{ "content:encoded": node.html }],
                  })
                )
              })

              return allContent
                .sort((a, b) => new Date(b.date) - new Date(a.date))
            },
            query: `
              {
                allMarkdownRemark(
                  sort: {frontmatter: {date: DESC}}
                  filter: { fields: { released: {eq: true}}}
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                      released
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
                allContentfulBlogPost(
                  sort: {createdAt: DESC}
                ) {
                  nodes {
                    description {
                      description
                    }
                    fields {
                      slug
                    }
                    content {
                      raw
                    }
                    title
                    date: createdAt
                    createdAt
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Jelani Harris Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jelani Harris`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
        include_favicon: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: "gatsby-plugin-htaccess",
      options: {
        RewriteBase: true,
        https: true,
        www: false,
        SymLinksIfOwnerMatch: true,
        host: "jelaniharris.com", // if 'www' is set to 'false', be sure to also remove it here!
        ErrorDocument: `
          ErrorDocument 404 /404
        `,
        redirect: ["RewriteRule ^[0-9]+/(.*)$ /blog/$1 [R=301,L,NE]"],
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `jelani-harris`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GOOGLE_ANALYTICS_TRACKING_ID, // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
  ],
}
