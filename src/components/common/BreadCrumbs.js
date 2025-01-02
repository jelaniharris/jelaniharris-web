import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import * as React from "react"

const BreadCrumbs = ({ crumbs }) => {
  return (
    <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
      <ul>
        {crumbs.map((crumb, index) => {
          return (
            <li
              key={`breadcrumbs-${index}`}
              className={crumb.isCurrent ? "is-active" : ""}
              aria-current="page"
            >
              {!crumb.isCurrent ? (
                <Link to={crumb.path}>
                  {crumb.icon && (
                    <span className="icon is-small">
                      <FontAwesomeIcon icon={crumb.icon} />
                    </span>
                  )}
                  <span>{crumb.label}</span>
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BreadCrumbs
