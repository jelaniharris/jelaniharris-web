import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import {
  faComment,
  faHome,
} from "@fortawesome/free-solid-svg-icons"

import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import DraftBlock from "../components/common/draftBlock"
import Series from "../components/blog/series"
import { CommentsProvider } from "../contexts/comments.context"
import { CommentsContainerButton } from "../components/blog/CommentsContainerButton"
import { FigureCaption } from "../components/common/FigureCaption"
import BreadCrumbs from "../components/common/BreadCrumbs"
import BlogHeader from "../components/blog/BlogHeader"
import BlogFeaturedImage from "../components/blog/BlogFeaturedImage"
import BlogDraftIndicator from "../components/blog/BlogDraftIndicator"
import BlogContent from "../components/blog/BlogContent"
import BlogBottomNav from "../components/blog/BlogBottomNav"
import BlogComments from "../components/blog/BlogComments"

const BlogPostTemplate = ({ data, location }) => {
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

  return (
    <CommentsProvider>
      <Layout
        location={location}
        title={siteTitle}
        noContainer
        preMain={
          <PreMain additionalClasses="breadcrumbs">
            <BreadCrumbs crumbs={
              [
                {path: "/", label: 'Home', icon: faHome},
                {path: "/blog", label: 'Blog', icon: faComment},
                {label: post.frontmatter.title, isCurrent: true},
              ]
            }  />  
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
            <BlogHeader title={post.frontmatter.title} date={post.frontmatter.date} formattedDate={post.frontmatter.formatdate} tags={tags} url={url} />
            <BlogDraftIndicator post={post} />
            <BlogFeaturedImage siteUrl={data.site.siteMetadata.siteUrl} originalImage={originalImage} featuredImgFluid={featuredImgFluid} featuredAlt={featuredAlt} featuredAltUrl={featuredAltUrl} />
            <BlogContent post={post} />
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

          <BlogBottomNav previous={{
            slug: previous?.fields.slug,
            title: previous?.frontmatter.title,
            featuredImage: previous?.frontmatter.featuredImage,
          }} next={{
            slug: next?.fields.slug,
            title: next?.frontmatter.title,
            featuredImage: next?.frontmatter.featuredImage,
          }} />
        </div>
        <BlogComments post={post} url={url} />
      </Layout>
    </CommentsProvider>
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
