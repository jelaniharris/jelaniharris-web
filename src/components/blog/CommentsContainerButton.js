import * as React from "react"
import { CommentsContext } from "../../contexts/comments.context"
import { Disqus } from "gatsby-plugin-disqus"

export const CommentsContainerButton = ({ post, url }) => {
  const { showComments, setShowComments } = React.useContext(CommentsContext)

  if (showComments) {
    return (
      <Disqus
        config={{
          /* Replace PAGE_URL with your post's canonical URL variable */
          url: url,
          /* Replace PAGE_IDENTIFIER with your page's unique identifier variable */
          identifier: post.fields.uniqueid,
          /* Replace PAGE_TITLE with the title of the page */
          title: post.title ?? post.frontmatter.title,
        }}
      />
    )
  } else {
    return (
      <button
        className="button is-link is-medium is-fullwidth"
        onClick={() => setShowComments(true)}
      >
        Read or Write a Comment
      </button>
    )
  }
}
