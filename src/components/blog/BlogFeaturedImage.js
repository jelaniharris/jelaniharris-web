import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { FigureCaption } from "../common/FigureCaption"

const BlogFeaturedImage = ({
  siteUrl,
  originalImage,
  featuredImgFluid,
  featuredAlt,
  featuredAltUrl,
}) => {
  return (
    <div className="mb-5">
      <meta
        itemProp="image"
        content={originalImage ? `${siteUrl}${originalImage}` : ""}
      />
      <figure className="post-image">
        <GatsbyImage alt={featuredAlt} image={featuredImgFluid} />
      </figure>
      <FigureCaption
        featuredAlt={featuredAlt}
        featuredAltUrl={featuredAltUrl}
      />
    </div>
  )
}

export default BlogFeaturedImage
