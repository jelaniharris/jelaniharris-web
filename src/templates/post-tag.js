import * as React from "react"
import { Link, graphql } from "gatsby"
import { faComment, faTag } from "@fortawesome/free-solid-svg-icons"
import PostEntry from "../components/blog/postEntry"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

const PostTagTemplate = ({ data, pageContext, location }) => {
  const { tag } = pageContext
  const { nodes: posts, totalCount } = data.allContentfulBlogPost
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

export default PostTagTemplate

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
    allContentfulBlogPost(
      limit: 2000
      sort: { createdAt: DESC }
      filter: {
        tags: { in: [$tag] } 
      }
    ) {
      totalCount
      nodes {

        fields {
          uniqueid
          slug
        }
          title
          tags
        description {
          description
        }
        featuredImage {
          gatsbyImageData(layout: FIXED, width: 400)
        }
        date: createdAt(formatString: "MMMM DD, YYYY")
        formatdate: createdAt(formatString: "YYYY-MM-DD")
      }
    }
  }
`