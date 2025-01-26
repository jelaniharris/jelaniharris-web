import * as React from "react"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <strong>{children}</strong>
const Text = ({ children }) => <p>{children}</p>
const Italics = ({ children }) => <em>{children}</em>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    [MARKS.ITALICS]: text => <Italics>{text}</Italics>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

/*
    return (
      <section
      className="content"
      dangerouslySetInnerHTML={{ __html: documentStr }}
      itemProp="articleBody"
    />
    )
    */

const BlogContent = ({ post }) => {
  if (post.html) {
    return (
      <section
        className="content"
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
    )
  } else {
    console.log(post.content.raw)
    const reactComponents = documentToReactComponents(
      JSON.parse(post.content.raw),
      options
    )
    return (
      <section className="content" itemProp="articleBody">
        {reactComponents}
      </section>
    )
  }

  return <></>
}

export default BlogContent
