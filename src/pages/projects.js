import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import ApparatusImages from "../images/projects/apparatus-300x198.jpg"
import BanditRevolersImage from "../images/projects/banditrevolvers-screenshot.png"

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
                  <li className="is-active"><a href="#" aria-current="page">Projects</a></li>
                </ul>
              </nav>
            </PreMain>
        }>
            <Seo
                title={"Projects"}
                description={"Projects made by me"}
            />
            <article
                className="webpage content py-5"
                itemScope
                itemType="http://schema.org/WebPage"
            >
                <h1 className="title is-1" itemProp="headline">Projects</h1>
                <h3>Here is everything that I've done over the past few years.</h3>

                <div className="box">
                    <h3>Bandit Revolvers (2009 – Now)</h3>
                    <div className="media">
                        <div className="media-left">
                            <img src={BanditRevolersImage} />
                        </div>
                        <div className="media-content">
                            <p>After I had closed down my old group blog website, I began to work on a new site that would host all of the comics and games that my friend and I have been working on. Due to the difficulty of finding a domain name that works, we decided to settle for the name Bandit Revolvers for our company – just because it sounded kinda neat.</p>
                            <p>I leveraged blogging code I had made for the Apparatus Complex and wrapped that around a new forum that handles all of the authentication and provides additional interaction.</p>
                            <ul>
                                <li>Custom blogging system using PHP, Jquery,  and the CodeIgniter framework.</li>
                                <li>Fully integrated single-sign on system with a bridge between the blog, the comments, and the forum.</li>
                                <li>There is an exposed API that is internally used to keep staff up to date (via nightly emails) about comments, and wiki modifications.</li>
                                <li>Exposed the authentication system to use one login for all possible sister sites that could be related to this site.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="box">
                    <h3>Apparatus Complex (2003 – 2009)</h3>
                    <div className="media">
                        <div className="media-left">
                            <img src={ApparatusImages} />
                        </div>
                        <div className="media-content">
                            <h4>History</h4>
                            <p>The very first iteration of this website was a project page on Geocities. Then I moved it to a group blog format on Tripod, and then to Blogger.com way before it was owned by Google. In an effort to bring more people into the site, I turned it into a public forum around mid 2003. Between 2003 and 2005 we had around 140 registered people on the site.</p>
                            <p>Then the site was dormant from 2005 to 2008, while I was busy with school and went through a period of being sick of administrating websites. Basically the site was drawing in a crowd of people that I didn’t like, and they were maneuvering the site in a social direction that I didn't desire.</p>
                            <p>An interesting way to look back on the history is to look at it using the <a onclick="javascript:pageTracker._trackPageview('/outgoing/web.archive.org/web/*/http://www.apparatuscomplex.com');" href="http://web.archive.org/web/*/http://www.apparatuscomplex.com">Internet Archive Wayback Machine</a>. It’s a little scary to see what life was like for me 5-6 years ago.</p>
                            <h4>Now</h4>
                            <p>In 2009, I decided to bring the site back. The first reason is that I'm older now, and so were the original members of the site so we could provide more interesting conversations. The second reason was that I honestly didn’t want to waste a domain name that I was paying for.</p>
                            <p>So that time decided to go with a discussion-forum in a blog like format. People really liked the openness of the forums, but they also enjoyed the intimacy of the blog format. I’m had an algorithm to determine which posts are front-page worthy and people were assigned points to provide a bit of competition.</p>
                            <p>Unfortunately, despite of the work I put into the site it suffered from a low visitor volume and low rant submissions. Of course this was partly due to various social networks becoming the defacto standard and micro blogging services that provided better rewards for shorter posts than longer ones. Instead of putting anymore work into the site I decided to close it down in November 2009, and promptly sold off the domain.</p>
                            <ul>
                                <li>Used JQuery for front-end commenting and posting.</li>
                                <li>Custom made back-end administration and CMS using Php and MySQL with support for multiple authors with various permissions.</li>
                                <li>Automatic tag generation using results from Yahoo’s Term Extractor API, and OpenCalais</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </article>
        </Layout>
    )
}

export default Projects;
