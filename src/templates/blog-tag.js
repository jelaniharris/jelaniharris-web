import * as React from "react"
import { Link, graphql } from "gatsby"
import { faComment, faTag } from "@fortawesome/free-solid-svg-icons"
import PostEntry from "../components/blog/postEntry"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

const BlogTagTemplate = ({ data, pageContext, location }) => {
  const { tag } = pageContext
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  const siteTitle = `Blog posts tagged with ${tag}`

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
              <li>
                <Link to="/blog">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faComment} />
                  </span>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/blog/tags">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faTag} />
                  </span>
                  Tags
                </Link>
              </li>
              <li className="is-active" aria-current="page">
                <span>{`Posts tagged with ${tag}`}</span>
              </li>
            </ul>
          </nav>
        </PreMain>
      }
    >
      <Seo
        title={`Posts tagged with ${tag}`}
        description={`Here are all of the blog posts tagged with ${tag}`}
        canonical={`${data.site.siteMetadata.siteUrl}/blog/tag/${tag}`}
      />
      <div className="container py-3">
        <h1 className="title is-2">{tagHeader}</h1>
        {posts.map(post => (
          <PostEntry key={post.fields.slug} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export default BlogTagTemplate

export const pageQuery = graphql`
  query ($tag: String) {
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
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fields: { released: { eq: true } }
      }
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
