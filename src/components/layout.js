import * as React from "react"
import Footer from "./footer"
import Header from "./header"
//import 'bulma/css/bulma.css'
import "../css/global.scss"

const Layout = ({ location, title, children, preMain, noContainer = false }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let childrenElement;

  if (noContainer) {
    childrenElement = children;
  } else {
    childrenElement = <div className="container">
      {children}
    </div>;
  }

  return (
    <section className="global-wrapper" data-is-root-path={isRootPath}>
      <Header location={location} title={title} />
      <main>
        {preMain}
        <div>
        {childrenElement}
        </div>
      </main>
      <Footer />
    </section>
  )
}

export default Layout
