import * as React from "react"
import { Link } from "gatsby"

import siteLogo from "../images/JelaniHarrisLogoVeryLarge.png";

const Header = ({location, title}) => {
  const rootPath = `${__PATH_PREFIX__}/`

  const isRootPath = location.pathname === rootPath
  let mainHeading = '';
  if (isRootPath) {
    mainHeading = 
      <div className="navbar-item">
        <h1 className="main-heading">
          <Link to="/"><img src={siteLogo} alt="Jelani Harris Logo" width="350" /></Link>
        </h1>
      </div>
  } else {
    mainHeading =  
      <div className="navbar-item">
        <h1 className="main-heading">
          <Link className="header-link-home"to="/"><img src={siteLogo} width="350" alt="Jelani Harris Logo" /></Link>
        </h1>
      </div>
  }

  const navBar = 
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        {mainHeading}
        <button role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>        
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item is-hoverable">
            <Link className="header-link-home" to="/">Home</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="header-link-home" to="/projects">Projects</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="header-link-home" to="/about">About</Link>
          </div>
          <div className="navbar-item is-hoverable">
            <Link className="header-link-home" to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </nav>

  return (
    <header className="header global-header">
      <div className="container">
        {navBar}
      </div>
    </header>
  )
}

export default Header;
