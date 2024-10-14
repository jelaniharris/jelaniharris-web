import * as React from "react"
import Footer from "./footer"
import Header from "./header"
//import 'bulma/css/bulma.css'
import "../css/global.scss"
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css"
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false /* eslint-disable import/first */

const Layout = ({
  location,
  title,
  children,
  preMain,
  noContainer = false,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let childrenElement

  if (noContainer) {
    childrenElement = children
  } else {
    childrenElement = <div className="container">{children}</div>
  }

  return (
    <section className="global-wrapper" data-is-root-path={isRootPath}>
      <Header location={location} title={title} />
      <main id="top">
        {preMain}
        <div>{childrenElement}</div>
      </main>
      <Footer />
    </section>
  )
}

export default Layout
