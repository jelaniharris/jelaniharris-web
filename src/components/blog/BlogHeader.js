import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import {
  faCalendar,
} from "@fortawesome/free-solid-svg-icons"
import ShowTags from '../common/showTags';

const BlogHeader = ({ title, date, formattedDate, tags, url }) => {
  return (
  <header className="mb-5 pb-3">
  <h1 className="title is-1 pb-2" itemProp="headline">
    {title}
  </h1>
  <div className="subtitle is-5 ml-1 is-flex is-justify-content-space-between">
    <div>
      <FontAwesomeIcon
        size="xs"
        icon={faCalendar}
        className="mr-2"
      />
      <time dateTime={formattedDate} className="mr-3">
        {date}
      </time>
    </div>
    <meta itemProp="url" content={url} />
    <span>
      <ShowTags tags={tags} />
    </span>
  </div>
</header>
  )
};

export default BlogHeader;