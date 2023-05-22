import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import TechStackLogo from "../images/about/TechStackIconSet.png"
import GatsbyLogo from "../images/about/gatsby.png"
import MarkdownLogo from "../images/about/markdown.png"

const SiteAttributions = ({ location }) => {
  const data = {
    "tools": [
      {
        name: "Gatsby",
        url: "https://www.gatsbyjs.com/",
        urlAlt: "Gatsby",
        image: GatsbyLogo,
        description: "Once I had moved on from Wordpress onto Gatsby I knew there was literally no turning back. When my content became statically generated, my site became faster, safer, and I don't get any bot spam anymore. It's a win-win.",
      },
      {
        name: "Markdown",
        url: "https://www.markdownguide.org/",
        urlAlt: "Markdown",
        image: MarkdownLogo,
        description: "Being able to use Markdown for my posts instead of a WYSISYG editor gave me a bit more control over the markup of the site.",
      }
    ],
    "resources": [
      {
        name: "Tech Stack Icons & Design Stack Icons",
        url: "https://www.figma.com/community/file/1095337897898466786/Tech-Stack-Icons-%26-Design-Stack-Icons",
        urlAlt: "Tech Stack Icons & Design Stack Icons",
        image: TechStackLogo,
        description:
          "A very nice set of icons that I used for the homepage to show the technologies that I use and know.",
      },
    ],
  }

  const DisplayAttributions = ({ type }) => {
    const atts = data[type];
    return (
      <div className="columns ">
        {atts.map(attribution => 
        <div className="column">
          <div className="card my-3">
            <div className="card-image">
              <div className="image is-16by9">
                <a href={attribution.url}>
                  <img src={attribution.image} alt={attribution.urlAlt} />
                </a>
              </div>
            </div>
            <div className="card-content">
              <a href={attribution.url}>
                <h2>{attribution.name}</h2>
              </a>
              <div className="content">{attribution.description}</div>
            </div>
          </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Layout
      location={location}
      title={"About"}
      preMain={
        <PreMain additionalClasses="breadcrumbs">
          <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
            <ul>
              <li>
                <Link to="/">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                  Home
                </Link>
              </li>
              <li className="is-active" aria-current="page">
                <span>Site Attributions</span>
              </li>
            </ul>
          </nav>
        </PreMain>
      }
    >
      <Seo
        title={"Site Attributions"}
        description={"Tools and resources I credit for making this site"}
      />
      <article
        className="webpage content py-5"
        itemScope
        itemType="http://schema.org/WebPage"
      >
        <h1 className="title is-1" itemProp="headline">
          Tools
        </h1>
        <DisplayAttributions type="tools" />
        <h1 className="title is-1" itemProp="headline">
          Resources
        </h1>
        <DisplayAttributions type="resources" />
      </article>
    </Layout>
  )
}

export default SiteAttributions
