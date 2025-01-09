import { Link } from "gatsby"
import * as React from "react"

const BlogBottomNav = ({ next, previous }) => {
  return (
    <nav className="blog-post-nav my-5">
      <ul>
        <li>
          {previous && previous.slug && (
            <Link to={previous.slug} rel="prev">
              ← {previous.title}
            </Link>
          )}
        </li>
        <li>
          {next && next.slug && (
            <Link to={next.slug} rel="next">
              {next.title} →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default BlogBottomNav
