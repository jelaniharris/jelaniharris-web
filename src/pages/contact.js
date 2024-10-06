import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"
import { graphql } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faPerson,
  faBars,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"

const Contact = ({ data, location }) => {
  return (
    <Layout
      location={location}
      title={"Contact"}
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
                <span>Contact Me</span>
              </li>
            </ul>
          </nav>
        </PreMain>
      }
    >
      <Seo
        title={"Contact"}
        description={"Contact Me by using the handy form"}
        canonical={`${data.site.siteMetadata.siteUrl}/contact`}
      />
      <article
        className="webpage content"
        itemScope
        itemType="http://schema.org/WebPage"
      >
        <h1 className="title is-1 pt-5" itemProp="headline">
          Contact Me
        </h1>
        <form
          name="contact-form"
          method="POST"
          action="/thank-you"
          data-netlify="true"
          data-netlify-recaptcha="true"
        >
          <input type="hidden" name="form-name" value="Contact Form" />
          <div className="columns">
            <div className="column">
              <div className="field">
                <label htmlFor="name" className="label is-medium">
                  Name*
                </label>
                <div className="control has-icons-left">
                  <input
                    required
                    id="name"
                    className="input is-medium"
                    name="name"
                    type="text"
                    placeholder="e.g. Jelani Harris"
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faPerson} />
                  </span>
                </div>
              </div>
              <div className="field">
                <label htmlFor="email" className="label is-medium">
                  Email*
                </label>
                <div className="control has-icons-left">
                  <input
                    required
                    id="email"
                    className="input is-medium"
                    name="email"
                    type="text"
                    placeholder="e.g. jharris@gooooogle.com"
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                </div>
              </div>
              <div className="field">
                <label htmlFor="subject" className="label is-medium">
                  Subject*
                </label>
                <div className="control has-icons-left">
                  <input
                    required
                    id="subject"
                    className="input is-medium"
                    name="subject"
                    type="text"
                    placeholder="e.g. Business"
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faBars} />
                  </span>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label htmlFor="message" className="label is-medium">
                  Message*
                </label>
                <div className="control">
                  <textarea
                    required
                    id="message"
                    name="message"
                    className="textarea is-medium"
                    placeholder="Enter your message here ..."
                  ></textarea>
                </div>
              </div>
              <div className="field is-grouped is-flex is-justify-content-center">
                <div className="control">
                  <button className="button is-link is-medium is-fullwidth">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        keywords
        title
        siteUrl
        author {
          name
        }
      }
    }
  }
`

export default Contact
