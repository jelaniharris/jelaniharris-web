import * as React from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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
    const documentStr = documentToHtmlString(JSON.parse(post.content.raw))
    return (
      <section
      className="content"
      dangerouslySetInnerHTML={{ __html: documentStr }}
      itemProp="articleBody"
    />
    )
  }

  return <></>
}

export default BlogContent