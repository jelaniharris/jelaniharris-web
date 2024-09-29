/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import SocialIcons from "./social-icons"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  return (
    <div className="bio message is-medium">
      <div className="message-body">
        <article className="media">
          <figure className="media-left">
            <StaticImage
              className="bio-avatar is-rounded"
              layout="fixed"
              formats={["auto", "webp", "avif"]}
              src="../images/profile-pic.png"
              width={80}
              height={80}
              quality={75}
              alt="Profile picture"
            />
          </figure>
          <div className="media-content">
            {author?.name && (
              <p>
                Written by <strong itemProp="author">{author.name}</strong>{" "}
                {author?.summary || null}
                {` `}
                <SocialIcons id="f_social_icons" />
              </p>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}

export default Bio
