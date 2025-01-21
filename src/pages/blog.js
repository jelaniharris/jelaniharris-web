import * as React from "react"
import { Link, graphql } from "gatsby"
import PostEntry from "../components/blog/postEntry"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import BreadCrumbs from "../components/common/BreadCrumbs"

const BlogIndex = ({ data, location }) => {
  const markdownPosts = data.allMarkdownRemark.nodes
  const contentfulPosts = data.allContentfulBlogPost.nodes
  console.log(contentfulPosts)

  const posts = [...markdownPosts, ...contentfulPosts].sort((a, b) => {
    const dateA = new Date(a.date || a.frontmatter.date || a.createdAt)
    const dateB = new Date(b.date || b.frontmatter.date || b.createdAt)
    return dateB - dateA
  })

  const siteTitle = `All Article & Blog posts`

  if (!posts || posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All article & blog posts" />
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
          <BreadCrumbs crumbs={[
            {path: "/", label: "Home", icon: faHome},
            {label: "Articles & Blogs", isCurrent: true},
          ]}/>
        </PreMain>
      }
    >
      <Seo title="All article & blog posts" />
      <div className="container py-3">
        <h1 className="title is-2">{"Article & Blog Posts"}</h1>
        {posts.map(post => (
          <PostEntry key={post.fields?.uniqueid || post.slug} post={post} />
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
    allContentfulBlogPost(sort: {createdAt: DESC}) {
      totalCount
      nodes {
        title
        updatedAt
        tags
        slug
        description {
          description
        }
        date: createdAt(formatString: "MMMM DD, YYYY")
        formatdate: createdAt(formatString: "YYYY-MM-DD")
        featuredImage {
          gatsbyImageData(layout: FIXED, width: 400)
        }
      }
    }
  }
`
