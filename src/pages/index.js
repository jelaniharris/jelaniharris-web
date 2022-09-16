import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Masonry from 'react-masonry-css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from "@fortawesome/free-brands-svg-icons"

import  { TwitterTweetEmbed } from 'react-twitter-embed';
import HeroMe from "../components/home/hero-me"
import HeroTechnologies from "../components/home/hero-technologies"

const SiteIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const tweets = data.allTwitterStatusesUserTimelineRecentTweets.nodes

  const breakpointColumnsObj = {
    default: 4,
    1300: 3,
    1100: 2,
    700: 1
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

  const TwitterPost = ({data}) => {
    return (
      <div key={`tweet-${data.slug}`}>
        <div className="card mb-3" key={data.slug}>
          <div className="card-header card-header-tweet is-justify-content-center">
            <span className="is-size-4"><FontAwesomeIcon icon={faTwitter} /></span>
            <span className="is-size-4 ml-2">Tweet</span>
          </div>
          <div className="card-content">
            <TwitterTweetEmbed tweetId={data.id} />
          </div>
        </div>
      </div>
    )
  }

  const BlogPost = ({content}) => {
    return (
      <div key={`blog-${content.slug}`}>
        <article
          itemScope
          itemType="http://schema.org/Article"
        >
          <div className="card mb-3">
              <div className="card-header card-header-blog is-justify-content-center">
                <span className="is-size-4"><FontAwesomeIcon icon={faComment} /></span>
                <span className="is-size-4 ml-2">Blog</span>
              </div>
              <div className="card-content">
                <p className="title" itemProp="headline" >
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
              <div className="card-footer">
                <div className="card-footer-item">
                  {
                    !!content && !!content.tags &&
                    <div className="tags">
                      {content.tags.map(tag => 
                        <span className="mr-1 tag is-medium" key={`tag-${tag}`}>{tag}</span>
                      )}
                    </div>
                  }
                </div>
                <small className="card-footer-item" itemProp="dateCreated">{content.created_at}</small>
              </div>
          </div>
        </article>
      </div>
    )
  }

  let contents = [];

  // Put the tweets into there
  tweets.forEach(tweet => {
    contents.push({
      type: 'tweet',
      id: tweet.id_str,
      slug: tweet.id,
      content: tweet.full_text,
      created_at: tweet.created_at,
      created_at_date: new Date(tweet.created_at)
    })
  });

  // Put the blogs into there
  posts.forEach(post => {
    contents.push({
      type: 'blog',
      title: post.frontmatter.title || post.fields.slug,
      tags: post.frontmatter.tags || [],
      slug: post.fields.slug,
      url: post.fields.slug,
      content: post.frontmatter.description || post.excerpt,
      created_at: post.frontmatter.date,
      created_at_date: new Date(post.frontmatter.date)
    })
  });

  // Then sort contents by the array
  contents = contents.sort((a, b) => (b.created_at_date - a.created_at_date));

  const contentElements = contents.map((data, index) => {
    if (data.type === 'blog') {
      return <BlogPost content={data} key={`content-${index}`} />
    } else if (data.type === 'tweet') {
      return <TwitterPost data={data} key={`content-${index}`} />
    }
    return <></>;
  });

  return (
    <Layout location={location} title={siteTitle} noContainer={true}>
      <Seo title="Home" />
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
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
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
    allTwitterStatusesUserTimelineRecentTweets(
      sort: {fields: created_at, order: DESC}
    ) {
      nodes {
        full_text
        created_at
        id
        user {
          name
        }
        id_str
      }
    }
  }
`
