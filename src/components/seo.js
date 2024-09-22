/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import GenericLogo from "../images/logo.png"
import FavIcon64x64 from "../images/favicon-64x64.png"
import FavIcon32x32 from "../images/favicon-32x32.png"
import FavIcon16x16 from "../images/favicon-16x16.png"

const Seo = ({
  description,
  canonical,
  lang,
  meta,
  title,
  image,
  pageKeywords,
  ogType,
  article,
  url,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
            siteUrl
            imageUrl
            author {
              name
            }
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const author = site.siteMetadata?.author?.name
  const siteImage = image || {
    width: 941,
    height: 529,
    src: `${site.siteMetadata.siteUrl}${GenericLogo}`,
  }
  const keywords = pageKeywords || site.siteMetadata.keywords

  let pageTitle = title
  let titleTemplate = null
  if (title === "Home") {
    titleTemplate = defaultTitle
    pageTitle = defaultTitle
  } else {
    titleTemplate = defaultTitle ? `%s | ${defaultTitle}` : null
  }

  let cleanKeywords = ""
  cleanKeywords = keywords.map(keyword => keyword.trim()).join(" ")

  let articleData = []
  if (article) {
    articleData = article
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      link={[
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: FavIcon16x16,
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: FavIcon32x32,
        },
        {
          rel: "shortcut icon",
          type: "image/png",
          href: FavIcon64x64,
        },
        {
          rel: "canonical",
          href: canonical,
        },
      ]}
      title={pageTitle}
      titleTemplate={titleTemplate}
      meta={[
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
        },
        {
          itemprop: "name",
          content: author,
        },
        {
          itemprop: "keywords",
          content: cleanKeywords,
        },
        {
          itemprop: "description",
          content: metaDescription,
        },
        {
          itemprop: "image",
          content: siteImage.src,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:site_name`,
          content: defaultTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: ogType || `website`,
        },
        {
          property: `og:image`,
          content: siteImage.src,
        },
        {
          property: `og:image:secure_url`,
          content: siteImage.src,
        },
        {
          property: `og:image:width`,
          content: siteImage.width,
        },
        {
          property: `og:image:height`,
          content: siteImage.height,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: "twitter:image",
          content: siteImage.src,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:url`,
          content: url,
        },
        {
          name: `og:url`,
          content: url,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta, articleData)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  article: [],
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  pageKeywords: PropTypes.arrayOf(PropTypes.string),
  ogType: PropTypes.string,
  url: PropTypes.string,
  article: PropTypes.arrayOf(PropTypes.object),
}

export default Seo
