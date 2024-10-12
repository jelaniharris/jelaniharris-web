import * as React from "react"
import { Link } from "gatsby"

import siteLogo from "../images/JelaniHarrisLogoVeryLarge.png"

const Header = ({ location, title }) => {
  const [isActive, setisActive] = React.useState(false)

  const rootPath = `${__PATH_PREFIX__}/`

  const isRootPath = location.pathname === rootPath
  let mainHeading = ""
  if (isRootPath) {
    mainHeading = (
      <div className="navbar-item">
        <div className="main-heading">
          <Link to="/">
            <img src={siteLogo} alt="Jelani Harris Logo" width="350" />
          </Link>
        </div>
      </div>
    )
  } else {
    mainHeading = (
      <div className="navbar-item">
        <div className="main-heading">
          <Link className="header-link-home" to="/">
            <img src={siteLogo} width="350" alt="Jelani Harris Logo" />
          </Link>
        </div>
      </div>
    )
  }

  const navBar = (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        {mainHeading}
        <button
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => {
            setisActive(!isActive)
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end">
          <div className="navbar-item is-hoverable">
            <Link className="header-link-home" to="/">
              Home
            </Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="header-link-home" to="/blog">
              Blog
            </Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="header-link-home" to="/projects">
              Projects
            </Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="header-link-home" to="/about">
              About
            </Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="header-link-home" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )

  return (
    <header className="header global-header">
      <div className="container">{navBar}</div>
    </header>
  )
}

export default Header
