import * as React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Disqus } from 'gatsby-plugin-disqus';


const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = `${post.frontmatter.title || 'Blog Post'} | ${data.site.siteMetadata?.title || "Title"}`;
  let featuredImgFluid = post.frontmatter.featuredImage?.childImageSharp?.fluid
  const featuredAlt = post.frontmatter.featuredAlt || null;
  const tags = post.frontmatter.tags || [];
  const { previous, next } = data
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const ShowTags = ({tags}) => {
    if (tags.length > 0) {
      return (
        <>
          Tagged: {
          tags.map(tag => 
            <span className="mr-1 tag is-small" key={`tag-${tag}`}>{tag}</span>
          )
          }
        </>
      )
    }
    return "";
  }

  return (
    <Layout location={location} title={siteTitle} noContainer preMain={
      <PreMain additionalClasses="breadcrumbs">
        <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/">
            <span className="icon is-small">
              <FontAwesomeIcon icon={faHome} />
            </span>
              Home</Link></li>
            <li className="is-active"><a href="#" aria-current="page">{post.frontmatter.title}</a></li>
          </ul>
        </nav>
      </PreMain>
    }>

      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div className="container pt-3">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header class="mb-5 pb-3">
            <h1 className="title is-1" itemProp="headline">{post.frontmatter.title}</h1>
            <p className="subtitle is-5 ml-1">
              <span className="mr-3">{post.frontmatter.date}</span>
              <span><ShowTags tags={tags} /></span>
            </p>
          </header>
          
          <div className="post-image mb-3">
            <Img fluid={featuredImgFluid} />
            {!!featuredAlt &&
              <span>{featuredAlt}</span>
            }
          </div>
          <section
            className="content"
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <hr />
          <footer>
            <Bio />
          </footer>
        </article>
        <nav className="blog-post-nav my-5">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <section id="blog-comments">
        <div className="container">
          <Disqus
            config={{
                /* Replace PAGE_URL with your post's canonical URL variable */
                url: url,
                /* Replace PAGE_IDENTIFIER with your page's unique identifier variable */
                identifier: post.fields.uniqueid,
                /* Replace PAGE_TITLE with the title of the page */
                title: post.frontmatter.title,
            }}
          />
        </div>
      </section>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        uniqueid
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        featuredAlt
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
