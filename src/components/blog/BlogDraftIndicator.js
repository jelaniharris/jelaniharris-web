import * as React from 'react';
import DraftBlock from '../common/draftBlock';

const BlogDraftIndicator = ({post}) => {
  if (post.frontmatter.draft) {
    return <DraftBlock />
  }
  return <></>
}

export default BlogDraftIndicator