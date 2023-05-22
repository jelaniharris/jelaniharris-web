import * as React from "react"
import { Link, graphql } from "gatsby"
import PostEntry from "../components/blog/postEntry"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

const BlogIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes
  const siteTitle = `All Blog posts`

  if (!posts || posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All blog posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      location={location}
      title={siteTitle}
      noContainer
      preMain={
        <PreMain additionalClasses="breadcrumbs">
          <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
            <ul>
              <li>
                <Link to="/">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                  Home
                </Link>
              </li>
              <li className="is-active" aria-current="page">
                <span>Blog</span>
              </li>
            </ul>
          </nav>
        </PreMain>
      }
    >
      <Seo title="All blog posts" />
      <div className="container py-3">
        <h1 className="title is-2">{"Blog Posts"}</h1>
        {posts.map(post => (
          <PostEntry key={post.fields.uniqueid} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        keywords
        title
        siteUrl
        author {
          name
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { released: {eq: true}}}
      sort: {frontmatter: {date: DESC}}
    ) {
      totalCount
      nodes {
        excerpt(pruneLength: 270)
        fields {
          uniqueid
          slug
          released
        }
        frontmatter {
          title
          tags
          description
          draft
          featuredImage {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 400)
            }
          }
          date(formatString: "MMMM DD, YYYY")
          formatdate: date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`
