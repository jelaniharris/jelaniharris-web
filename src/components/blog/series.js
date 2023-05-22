import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Series = ({ series, previousSeries, nextSeries }) => {
  const SeriesNavigation = () => {
    if (!previousSeries && !nextSeries) {
      return <></>
    }

    return (
      <nav className="series-post-nav mt-5">
        <ul>
          <li>
            {previousSeries && (
              <>
                <GatsbyImage
                  image={getImage(previousSeries.frontmatter.featuredImage) || null}
                  layout="constraint"
                  width={75}
                  height={75}
                  quality={75}
                />
                <Link to={previousSeries.fields.slug} rel="prev">
                  ← {previousSeries.frontmatter.title}
                </Link>
              </>
            )}
          </li>
          <li>
            {nextSeries && (
              <Link to={nextSeries.fields.slug} rel="next">
                {nextSeries.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    )
  }

  if (!series || !series.title) {
    return <></>
  }

  return (
    <div className="series message is-medium is-info my-4">
      <div className="message-body">
        This post is apart of the series: {series.title}
        <p>{series.description}</p>
        <SeriesNavigation />
      </div>
    </div>
  )
}

export default Series
