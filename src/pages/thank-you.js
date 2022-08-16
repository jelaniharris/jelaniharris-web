import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const ThankYou = ({location}) => {
    return (
        <Layout location={location} title={"Thank You"} preMain={
            <PreMain additionalClasses="breadcrumbs">
              <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
                <ul>
                  <li><Link to="/">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                    Home</Link></li>
                  <li class="is-active"><a href="#" aria-current="page">Contact Me</a></li>
                </ul>
              </nav>
            </PreMain>
        }>
            <Seo
                title={"Thank You"}
                description={"Thank you for contacting me"}
            />
            <article
                className="webpage content pt-5"
                itemScope
                itemType="http://schema.org/WebPage"
            >
                <h1 className="title is-1" itemProp="headline">Thank You</h1>
                <p>Thank you for contacting me, I'll reach out respond as soon as I can.</p>
                <p>Or if you're a spammer, I'll send your email to the abyss.</p>
            </article>
        </Layout>
    );
}

export default ThankYou;
