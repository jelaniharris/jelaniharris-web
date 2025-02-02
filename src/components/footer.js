import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SocialIcons from "./social-icons"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      recentContentfulPosts: allContentfulBlogPost(
        sort: { createdAt: DESC }
        limit: 4
      ) {
        nodes {
          fields {
            slug
          }
          title
          date: createdAt(formatString: "MMMM DD, YYYY")
          description {
            description
          }
          featuredImage {
            gatsbyImageData(width: 75, placeholder: BLURRED, formats: [AUTO])
          }
        }
      }
      recentMarkdownPosts: allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { fields: { released: { eq: true } } }
        limit: 4
      ) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  width: 75
                  placeholder: BLURRED
                  formats: [AUTO]
                )
              }
            }
          }
        }
      }
      upcomingPosts: allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { draft: { eq: true }, preview: { eq: true } } }
        limit: 4
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            series {
              title
            }
          }
        }
      }
    }
  `)

  const markdownNodes = data.recentMarkdownPosts.nodes
  const contentfulNodes = data.recentContentfulPosts.nodes
  const upcomingNodes = data.upcomingPosts.nodes

  const OtherThings = () => {
    return (
      <>
        <h3 className="title is-3 my-5">Other Places</h3>
        <div className="upcoming-posts is-flex is-flex-direction-row is-flex-wrap-wrap">
          <ul>
            <li>
              <Link to="/site-attributions">Site Attributions</Link>
            </li>
          </ul>
        </div>
      </>
    )
  }

  const UpcomingArticles = ({ posts }) => {
    const renderArticleTitle = postData => {
      let seriesLabel = ""
      if (postData.frontmatter.series && postData.frontmatter.series.title) {
        seriesLabel = `(${postData.frontmatter.series.title}) `
      }
      return (
        <li key={`upcoming-${postData.fields.slug}`}>
          {seriesLabel + postData.frontmatter.title}
        </li>
      )
    }

    if (posts.length === 0) {
      return <></>
    }

    return (
      <div className="column is-one-third-tablet">
        <h3 className="title is-3">Upcoming Articles</h3>
        <div className="upcoming-posts is-flex is-flex-direction-row is-flex-wrap-wrap">
          <ul>{posts.map(post => renderArticleTitle(post))}</ul>
        </div>
        <OtherThings />
      </div>
    )
  }

  const RecentBlogOrArticlePosts = ({ posts }) => {
    if (posts.length === 0) {
      return <></>
    }

    const renderPost = postData => {
      const featuredImgThumbail =
        getImage(
          postData.featuredImage ?? postData.frontmatter.featuredImage
        ) || null
      let ImageElement
      if (featuredImgThumbail) {
        ImageElement = (
          <GatsbyImage
            className="recent-blog-featured-image"
            layout="constraint"
            formats={["auto", "webp", "avif"]}
            image={featuredImgThumbail}
            width={75}
            height={75}
            quality={75}
            alt="Post Thumbnail"
          />
        )
      } else {
        ImageElement = <div style={{ width: 75 }}></div>
      }
      return (
        <div
          key={`recent-post-${postData.fields.slug}`}
          className="recent-post-entry"
        >
          <div className="media">
            <figure className="media-left">{ImageElement}</figure>
            <div className="media-content">
              <Link className="is-size-5" to={postData.fields.slug}>
                {postData.title ?? postData.frontmatter.title}
              </Link>
              <p className="is-size-6">
                {postData.description?.description ??
                  postData.frontmatter.description ??
                  postData.excerpt}
              </p>
              <p className="is-size-6">
                {postData.date ?? postData.frontmatter.date}
              </p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="column is-two-thirds-tablet">
        <h3 className="title is-3">Recent Posts</h3>
        <div className="recent-posts is-flex is-flex-direction-row is-flex-wrap-wrap">
          {posts.map(post => renderPost(post))}
        </div>
      </div>
    )
  }

  const sortedNodes = [...markdownNodes, ...contentfulNodes].sort((a, b) => {
    return (
      new Date(b.date ?? b.frontmatter?.date) -
      new Date(a.date ?? a.frontmatter?.date)
    )
  })

  return (
    <footer className="page-footer">
      <div className="pre-footer py-3">
        <section className="container">
          <div className="columns">
            <RecentBlogOrArticlePosts posts={sortedNodes} />
            <UpcomingArticles posts={upcomingNodes} />
          </div>
        </section>
      </div>
      <div className="copyright-social p-4">
        <section className="container">
          <div className="is-flex is-flex-direction-row is-justify-content-space-between">
            <div>
              © {new Date().getFullYear()} Jelani Harris
              <span>
                , Built with care and
                {` `}
                <a href="https://www.gatsbyjs.com">Gatsby</a>
                {` `} &amp; {` `}{" "}
                <a href="https://www.markdownguide.org/">Markdown</a>
                {` `}| All Rights Reserved
              </span>
            </div>
            <div className="">
              <SocialIcons id="f_social_icons" />
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer
