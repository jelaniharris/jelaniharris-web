import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Masonry from "react-masonry-css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-solid-svg-icons"

import HeroMe from "../components/home/hero-me"
import HeroTechnologies from "../components/home/hero-technologies"
import DraftBlock from "../components/common/draftBlock"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const SiteIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteUrl =
    data.site.siteMetadata?.siteUrl || `https://www.jelaniharris.com`
  const posts = data.allMarkdownRemark.nodes

  const breakpointColumnsObj = {
    default: 4,
    1300: 3,
    1100: 2,
    700: 1,
  }

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

  const BlogPost = ({ content }) => {
    return (
      <div key={`blog-${content.slug}`}>
        <article itemScope itemType="http://schema.org/Article">
          <div className="card mb-3">
            <div
              className={`card-header card-header-blog ${
                content.draft ? "card-header-blog-draft" : ""
              } is-justify-content-center`}
            >
              <span className="is-size-4">
                <FontAwesomeIcon icon={faComment} />
              </span>
              <span className="is-size-4 ml-2">Blog</span>
            </div>
            <figure className="card-image image">
              {content.featuredImage && (
                <GatsbyImage
                  image={content.featuredImage}
                  width={300}
                  alt={`${content.title}`}
                  style={{ height: "100%", width: "100%", minHeight: "150px" }}
                />
              )}
            </figure>
            <div className="card-content">
              <p className="title" itemProp="headline">
                <span>
                  <Link to={content.url} itemProp="url">
                    {content.title}
                  </Link>
                </span>
              </p>

              <section className="content">
                <p
                  dangerouslySetInnerHTML={{
                    __html: content.content,
                  }}
                  itemProp="description"
                />
              </section>
            </div>
            {content.draft && <DraftBlock />}
            <div className="card-footer">
              <div className="card-footer-item">
                {!!content && !!content.tags && (
                  <div className="tags">
                    {content.tags.map(tag => (
                      <span className="mr-1 tag is-medium" key={`tag-${tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <small className="card-footer-item" itemProp="dateCreated">
                {content.created_at}
              </small>
            </div>
          </div>
        </article>
      </div>
    )
  }

  let contents = []

  // Put the blogs into there
  posts.forEach(post => {
    contents.push({
      type: "blog",
      title: post.frontmatter.title || post.fields.slug,
      tags: post.frontmatter.tags || [],
      slug: post.fields.slug,
      url: post.fields.slug,
      draft: post.frontmatter.draft,
      content: post.frontmatter.description || post.excerpt,
      featuredImage: getImage(post.frontmatter.featuredImage),
      created_at: post.frontmatter.date,
      created_at_date: new Date(post.frontmatter.date),
    })
  })

  // Then sort contents by the array
  contents = contents.sort((a, b) => b.created_at_date - a.created_at_date)

  const contentElements = contents.map((data, index) => {
    if (data.type === "blog") {
      return <BlogPost content={data} key={`content-${index}`} />
    }
    return <></>
  })

  return (
    <Layout location={location} title={siteTitle} noContainer={true}>
      <Seo title="Home" canonical={siteUrl} url={siteUrl} />
      <HeroMe />
      <HeroTechnologies />
      <div className="recent-activity">
        <div className="has-text-centered pt-4">
          <h2 className="title is-2">Recent Activity</h2>
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {contentElements}
        </Masonry>
      </div>
    </Layout>
  )
}

export default SiteIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { released: { eq: true } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
          released
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          draft
          featuredImage {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 300)
            }
          }
          tags
        }
      }
    }
  }
`
