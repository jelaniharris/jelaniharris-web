import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import ShowTags from "../common/showTags"

const PostEntry = ({ post }) => {
  const { frontmatter, fields, excerpt } = post
  let featuredImgFixed = getImage(post.featuredImage ?? frontmatter.featuredImage)

  return (
    <div className={`card my-3 ${frontmatter && frontmatter.draft ? "blog-card-draft" : ""}`}>
      <div className="is-flex is-flex-direction-row is-align-content-flex-start">
        <figure>
          <Link to={post.slug ?? fields.slug}>
            <GatsbyImage
              image={featuredImgFixed}
              width={400}
              style={{ height: "100%", minHeight: "200px" }}
            />
          </Link>
        </figure>
        <div
          className="card-content is-flex is-flex-direction-column is-justify-content-space-between"
          style={{ width: "100%" }}
        >
          <div>
            <Link to={post.slug ?? fields.slug}>
              <h3 className="title is-3">{post.title ?? frontmatter.title}</h3>
            </Link>
            <p className="mt-3">{post?.description?.description || frontmatter.description || excerpt}</p>
          </div>
          <div className="is-flex is-justify-content-space-between mt-3">
            <time dateTime={post.formatdate ?? frontmatter.formatdate}>{post.date ?? frontmatter.date}</time>
            <ShowTags tags={post.tags ?? frontmatter.tags} hideLabel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostEntry
