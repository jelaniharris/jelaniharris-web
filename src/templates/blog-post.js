import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faComment,
  faHome,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons"
import { Disqus } from "gatsby-plugin-disqus"
import ShowTags from "../components/common/showTags"

import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import DraftBlock from "../components/common/draftBlock"
import Series from "../components/blog/series"

const BlogPostTemplate = ({ data, location }) => {
  const [showComments, setShowComments] = React.useState(false)

  const post = data.markdownRemark
  const siteTitle = `${post.frontmatter.title || "Blog Post"} | ${
    data.site.siteMetadata.title
  }`
  let featuredImgFluid = getImage(post.frontmatter.featuredImage)
  let originalImage = getSrc(post.frontmatter.featuredImage)
  const featuredAlt = post.frontmatter.featuredAlt || null
  const featuredAltUrl = post.frontmatter.featuredAltUrl || null
  const tags = post.frontmatter.tags || []
  const { previous, next, previousSeries, nextSeries } = data
  const url = typeof window !== "undefined" ? window.location.href : ""

  const getCaption = () => {
    if (!featuredAlt) {
      return <></>
    }

    const figCaptionClasses =
      "image-credit is-size-6 has-text-centered has-text-weight-light"

    if (featuredAltUrl) {
      return (
        <figcaption className={figCaptionClasses}>
          <a href={featuredAltUrl} target="_blank" rel="noreferrer">
            {featuredAlt}
          </a>
        </figcaption>
      )
    } else {
      return (
        <figcaption className={figCaptionClasses}>{featuredAlt}</figcaption>
      )
    }
  }

  const ShowCommentsContainer = () => {
    if (showComments) {
      return (
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
      )
    } else {
      return (
        <button
          className="button is-link is-medium is-fullwidth"
          onClick={() => setShowComments(true)}
        >
          Read or Write a Comment
        </button>
      )
    }
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
              <li>
                <Link to="/blog">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faComment} />
                  </span>
                  Blog
                </Link>
              </li>
              <li className="is-active" aria-current="page">
                <span>{post.frontmatter.title}</span>
              </li>
            </ul>
          </nav>
        </PreMain>
      }
    >
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        ogType="article"
        canonical={`${data.site.siteMetadata.siteUrl}${post.fields.slug}`}
        image={
          originalImage ??
          `${data.site.siteMetadata.siteUrl}${originalImage}` ??
          null
        }
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
          {
            property: `article:author`,
            content: data.site.siteMetadata?.author?.name,
          },
          {
            property: `article:tag`,
            content:
              tags && tags.length > 0
                ? tags.join(", ")
                : data.site.siteMetadata?.keywords.join(", "),
          },
        ]}
      />
      <div className="container pt-3">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header className="mb-5 pb-3">
            <h1 className="title is-1" itemProp="headline">
              {post.frontmatter.title}
            </h1>
            <div className="subtitle is-5 ml-1 is-flex is-justify-content-space-between">
              <div>
                <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                <time dateTime={post.frontmatter.formatdate} className="mr-3">
                  {post.frontmatter.date}
                </time>
              </div>
              <meta itemProp="url" content={url} />
              <span>
                <ShowTags tags={tags} />
              </span>
            </div>
          </header>

          <div className="mb-5">
            <meta
              itemProp="image"
              content={
                originalImage
                  ? `${data.site.siteMetadata.siteUrl}${originalImage}`
                  : ""
              }
            />
            <figure className="post-image">
              <GatsbyImage alt={featuredAlt} image={featuredImgFluid} />
            </figure>
            {getCaption()}
          </div>
          {post.frontmatter.draft && <DraftBlock />}
          <section
            className="content"
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <hr />
          <section id="blog-series">
            <Series
              series={post.frontmatter.series}
              previousSeries={previousSeries}
              nextSeries={nextSeries}
            />
          </section>
          <footer>
            <Bio />
          </footer>
        </article>

        <nav className="blog-post-nav my-5">
          <ul>
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
          <ShowCommentsContainer />
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
    $previousSeriesPostId: String
    $nextSeriesPostId: String
  ) {
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
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        uniqueid
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        modified_date(formatString: "MMMM DD, YYYY")
        formatdate: date(formatString: "YYYY-MM-DD")
        description
        draft
        series {
          id
          startDate
          title
          endDate
          description
        }
        seriesOrder
        tags
        featuredAlt
        featuredAltUrl
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
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
