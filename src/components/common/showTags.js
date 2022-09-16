import * as React from "react"
import { Link } from "gatsby"
import { kebabCase } from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"

const ShowTags = ({ tags, hideLabel = false }) => {
  if (tags.length > 0) {
    return (
      <div>
        {!hideLabel && <span>Tagged: </span>}
        {tags.map(tag => (
          <Link
            to={`/blog/tag/${kebabCase(tag)}`}
            className="mr-1 tag is-small"
            key={`tag-${tag}`}
          >
            <FontAwesomeIcon className="mr-1" icon={faTag} />
            {tag}
          </Link>
        ))}
      </div>
    )
  }
  return ""
}

export default ShowTags
