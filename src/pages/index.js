import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Masonry from 'react-masonry-css'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >

      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug;
        const tags = post.frontmatter.tags || [];

        return (
          <article
            itemScope
            itemType="http://schema.org/Article"
          >
          <div className="card mb-3" key={post.fields.slug}>
              <div className="card-header card-header-blog is-justify-content-center">Blog</div>
              <div className="card-content">
                <p className="title" itemProp="headline" >
                  <span>
                    <Link to={post.fields.slug} itemProp="url">
                      {title}
                    </Link>
                  </span>
                </p>
                <section className="content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>                
                
              </div>
              <div className="card-footer">
                <div className="card-footer-item">
                  <div className="tags">
                    {tags.map(tag => 
                      <span className="mr-1 tag is-medium" key={`tag-${tag}`}>{tag}</span>
                    )}
                  </div>
                </div>
                <small className="card-footer-item" itemProp="dateCreated">{post.frontmatter.date}</small>
              </div>
          </div>
          </article>
        )
      })}
      </Masonry>

    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
