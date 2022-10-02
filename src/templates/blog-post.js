import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHome } from '@fortawesome/free-solid-svg-icons';
import { Disqus } from 'gatsby-plugin-disqus';
import ShowTags from "../components/common/showTags"

import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import DraftBlock from "../components/common/draftBlock"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = `${post.frontmatter.title || 'Blog Post'} | ${data.site.siteMetadata.title}`;
  let featuredImgFluid = getImage(post.frontmatter.featuredImage);
  let originalImage = getSrc(post.frontmatter.featuredImage);
  const featuredAlt = post.frontmatter.featuredAlt || null;
  const featuredAltUrl = post.frontmatter.featuredAltUrl || null;
  const tags = post.frontmatter.tags || [];
  const { previous, next } = data
  const url = typeof window !== 'undefined' ? window.location.href : '';


  const getCaption = () => {
    if (!featuredAlt) {
      return <></>;
    }

    const figCaptionClasses = "image-credit is-size-6 has-text-centered has-text-weight-light";

    if (featuredAltUrl) {
      return (<figcaption className={figCaptionClasses}>
        <a href={featuredAltUrl} target="_blank" rel="noreferrer">
        {featuredAlt}</a>
        </figcaption>)
    } else {
      return(<figcaption className={figCaptionClasses}>{featuredAlt}</figcaption>)
    }
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
              <li>
              <Link to="/blog">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faComment} />
                </span>
                Blog
                </Link>
              </li>
            <li className="is-active" aria-current="page"><span>{post.frontmatter.title}</span></li>
          </ul>
        </nav>
      </PreMain>
    }>

      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        ogType="article"
        image={{
          src: originalImage ? `${data.site.siteMetadata.siteUrl}${originalImage}` : null
        }}
        pageKeywords={tags}
        url={`${data.site.siteMetadata.siteUrl}${post.fields.slug}`}
        article={[
          {
            property: `article:published_time`,
            content: post.frontmatter.date,
          },
          {
            property: `article:modified_time`,
            content: post.frontmatter.date,
          },
          {
            property: `article:author`,
            content: data.site.siteMetadata?.author?.name,
          },
          {
            property: `article:tag`,
            content: tags && tags.length > 0 ? tags.join(", ") : data.site.siteMetadata?.keywords.join(", "),
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
            <h1 className="title is-1" itemProp="headline">{post.frontmatter.title}</h1>
            <div className="subtitle is-5 ml-1 is-flex is-justify-content-space-between">
              <time dateTime={post.frontmatter.formatdate} className="mr-3">{post.frontmatter.date}</time>
              <meta itemProp="url" content={url} />
              <span><ShowTags tags={tags} /></span>
            </div>
          </header>
          
          <div className="mb-5">
            <meta itemProp="image" content={originalImage ? `${data.site.siteMetadata.siteUrl}${originalImage}` : ''} />
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
          <footer>
            <Bio />
          </footer>
        </article>
        <nav className="blog-post-nav my-5">
          <ul
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
        keywords,
        title,
        siteUrl,
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
        formatdate : date(formatString: "YYYY-MM-DD")
        description
        draft
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
  }
`
