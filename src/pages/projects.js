import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Projects = ({location}) => {
    return (
        <Layout location={location} title={"Projects"} preMain={
            <PreMain additionalClasses="breadcrumbs">
              <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
                <ul>
                  <li><Link to="/">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                    Home</Link></li>
                  <li className="is-active" aria-current="page"><span>Projects</span></li>
                </ul>
              </nav>
            </PreMain>
        }>
            <Seo
                title={"Projects"}
                description={"Projects made by me in the past, or ones I'm currently working on"}
            />
            <article
                className="webpage content py-5"
                itemScope
                itemType="http://schema.org/WebPage"
            >
                <h1 className="title is-1" itemProp="headline">Projects</h1>
                <h3>Here is everything that I've done over the past few years.</h3>

                <div class="notification is-warning is-light">
                    <h2>Eeek!</h2>
                    <p>I'm slowly updating this projects page to display more of the more modern things that I've worked on lately.</p>
                    <p>I'm still waiting for my work related NDAs to expire before I can talk about them here.</p>
                    <p>If you really, <em>really</em> want to see my old projects page, then it's <Link to="/projects-old">here</Link></p>
                </div>
            </article>
        </Layout>
    )
}

export default Projects;
