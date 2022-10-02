import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import PreMain from "../../components/premain"
import Seo from "../../components/seo"

import { kebabCase } from "lodash"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faTag } from "@fortawesome/free-solid-svg-icons"
import { faComment } from "@fortawesome/free-solid-svg-icons"

const BlogTagsIndex = ({ data, location }) => {
  const tags = data.allMarkdownRemark.group
  const title = data.site.siteMetadata.title
  const siteTitle = `Blog Tags for ${title}`

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
              <li className="is-active" aria-current="page">
                <span>Tags</span>
              </li>
            </ul>
          </nav>
        </PreMain>
      }
    >
      <Seo title="All blog posts" />
      <div className="container py-3">
        <h1 className="title is-2">Tags</h1>
        <ul  className="tags">
            {tags.map(tag => (
            <li key={tag.fieldValue} className="tag is-large">
                <Link to={`/blog/tag/${kebabCase(tag.fieldValue)}/`}>
                <span className="icon is-small mr-1">
                    <FontAwesomeIcon icon={faTag} />
                </span>
                {tag.fieldValue} ({tag.totalCount})
                </Link>
            </li>
            ))}
        </ul>
      </div>
    </Layout>
  )
}

export default BlogTagsIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { released: { eq: true }}}
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
