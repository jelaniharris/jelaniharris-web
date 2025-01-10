import * as React from "react"
import { CommentsContainerButton } from "./CommentsContainerButton"

const BlogComments = ({ post, url }) => {
  return (
    <section id="blog-comments">
      <div className="container">
        <CommentsContainerButton post={post} url={url} />
      </div>
    </section>
  )
}

export default BlogComments
