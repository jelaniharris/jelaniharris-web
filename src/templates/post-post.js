import * as React from "react"
import { Link, graphql } from "gatsby"
import { CommentsProvider } from "../contexts/comments.context"
import Layout from "../components/layout"
import { getImage, getSrc } from "gatsby-plugin-image"
import PreMain from "../components/premain"
import BreadCrumbs from "../components/common/BreadCrumbs"
import { faComment, faHome } from "@fortawesome/free-solid-svg-icons"
import Seo from "../components/seo"
import BlogHeader from "../components/blog/BlogHeader"
import BlogFeaturedImage from "../components/blog/BlogFeaturedImage"
import BlogContent from "../components/blog/BlogContent"
import Bio from "../components/bio"
import BlogBottomNav from "../components/blog/BlogBottomNav"
import BlogComments from "../components/blog/BlogComments"

const PostPostTemplate = ({ data, location }) => {
  const post = data.contentfulBlogPost || data.markdownRemark
  const title = post.title || post.frontmatter.title || "Blog Post"
  const description =
    post.description?.description || post.frontmatter.description || post.excerpt
  const siteTitle = `${title} | ${data.site.siteMetadata.title}`
  const slug = post.fields.slug
  let featuredImgFluid = getImage(
    post.featuredImage || post.frontmatter.featuredImage
  )
  const featuredAlt = post.featuredAlt || post.frontmatter.featuredAlt || null
  const featuredAltUrl = post.featuredAltUrl || post.frontmatter.featuredAltUrl || null
  let originalImage = getSrc(
    post.featuredImage || post.frontmatter.featuredImage
  )
  const postDate = post.date || post.frontmatter.date
  const modifiedDate = post.modified_date || post.frontmatter.modified_date
  const tags = post.tags || post.frontmatter.tags || []
  const url = typeof window !== "undefined" ? window.location.href : ""
  const { previous, next } = data

  return (
    <CommentsProvider>
      <Layout
        location={location}
        title={siteTitle}
        noContainer
        preMain={
          <PreMain additionalClasses="breadcrumbs">
            <BreadCrumbs
              crumbs={[
                { path: "/", label: "Home", icon: faHome },
                { path: "/blog", label: "Articles & Blogs", icon: faComment },
                { label: post.title, isCurrent: true },
              ]}
            />
          </PreMain>
        }
      >
        <Seo
          title={title}
          description={description}
          ogType="article"
          canonical={`${data.site.siteMetadata.siteUrl}${slug}`}
          image={
            originalImage ??
            `${data.site.siteMetadata.siteUrl}${originalImage}` ??
            null
          }
          pageKeywords={tags}
          url={`${data.site.siteMetadata.siteUrl}${slug}`}
          article={[
            {
              property: `article:published_time`,
              content: postDate,
            },
            {
              property: `article:modified_time`,
              content: modifiedDate,
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
            <BlogHeader
              title={title}
              date={postDate}
              formattedDate={post.formatdate}
              tags={tags}
            />
            <BlogFeaturedImage
              siteUrl={data.site.siteMetadata.siteUrl}
              originalImage={originalImage}
              featuredImgFluid={featuredImgFluid}
              featuredAlt={featuredAlt}
              featuredAltUrl={featuredAltUrl}
            />
            <BlogContent post={post} />
            <hr />
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

export default PostPostTemplate

export const pageQuery = graphql`
  query PostPostBySlug($id: String!) {
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
    contentfulBlogPost(id: { eq: $id }) {
      id
      title
      tags
      fields {
        uniqueid
        slug
      }
      description {
        description
      }
      content {
        raw
      }
      date: createdAt(formatString: "MMMM DD, YYYY")
      formatdate: createdAt(formatString: "YYYY-MM-DD")
      modified_date: updatedAt(formatString: "MMMM DD, YYYY")
      featuredAlt
      featuredAltUrl
      featuredImage {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`
