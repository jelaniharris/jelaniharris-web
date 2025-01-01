import * as React from "react"

export const FigureCaption = ({ featuredAlt, featuredAltUrl }) => {
  if (!featuredAlt) {
    return <></>
  }

  const figCaptionClasses =
    "image-credit is-size-6 has-text-centered has-text-weight-light"

  if (featuredAltUrl) {
    return (
      <figcaption className={figCaptionClasses}>
        <a href={featuredAltUrl} target="_blank" rel="noreferrer">
          {featuredAlt}
        </a>
      </figcaption>
    )
  } else {
    return (
      <figcaption className={figCaptionClasses}>{featuredAlt}</figcaption>
    )
  }
}