import * as React from "react"
import { Link, graphql } from "gatsby"
import ImageGallery from "react-image-gallery"
import { getSrc } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

import ApparatusImages from "../images/projects/apparatus-300x198.jpg"
import BanditRevolersImage from "../images/projects/banditrevolvers-screenshot.png"

const Projects = ({ data, location }) => {
  const bakieProjectImages = data ? data.bakie.nodes : null
  let smarterProjectImages = data ? data.smarter.nodes : null
  let bakieImages = []
  let smarterImages = []

  if (bakieProjectImages) {
    const bakieDataDescription = {
      BakieScrapie: "Dashboard page revealing overall recpies and comments",
      BakieScrapie2: "A listing of recipes in the system",
      BakieScrapie3: "A recipe page with overall user sentiment",
      BakieScrapie4: "Sentiment parsing of a comment for a recipe",
      BakieScrapie5: "Ingredients in comments analysis for a recipe",
      BakieScrapie6:
        "Listing of modifiers to parse and tenses with weighted confidence values",
      BakieScrapie7: "A searchable external database of 10k loaded recipes",
    }

    bakieImages = bakieProjectImages.map(img => {
      return {
        original: `${img.publicURL}`,
        thumbnail: `${getSrc(img.childImageSharp)}`,
        description: bakieDataDescription[img.name] || null,
      }
    })
  }

  if (smarterProjectImages) {
    const smarterDataDescription = {
      SmarterSpreadsheets2: "Testimonials",
      SmarterSpreadsheets3: "Call to action and footer",
      SmarterSpreadsheets4: "Contact page",
      SmarterSpreadsheets1: "Main page with hero description",
    }

    smarterImages = smarterProjectImages.map(img => {
      return {
        original: `${img.publicURL}`,
        thumbnail: `${getSrc(img.childImageSharp)}`,
        description: smarterDataDescription[img.name] || null,
      }
    })
  }

  const TechStack = ({ values }) => {
    return (
      <div className="has-background-info has-text-white p-3 my-3">
        <span className="is-uppercase has-text-weight-bold ">Tech Stack:</span>{" "}
        {values}
      </div>
    )
  }

  return (
    <Layout
      location={location}
      title={"Projects"}
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
                <span>Projects</span>
              </li>
            </ul>
          </nav>
        </PreMain>
      }
    >
      <Seo
        title={"Projects"}
        description={
          "Projects made by me in the past, or ones I'm currently working on"
        }
        canonical={`${data.site.siteMetadata.siteUrl}/projects`}
      />
      <article
        className="webpage content py-5"
        itemScope
        itemType="http://schema.org/WebPage"
      >
        <h1 className="title is-1" itemProp="headline">
          Projects
        </h1>
        <h4 className="title is-4">
          Here is everything that I've done over the past few years for fun,
          learning, and work
        </h4>
        <div className="notification is-warning is-light">
          <h2>Eeek!</h2>
          <p>
            I've neglected this project page for a long time, so I'm slowly
            updating it display more of the more modern things that I've worked
            on lately.
          </p>
          <p>
            So please keep in mind that some of these projects are old. Very
            old.
          </p>
        </div>

        <div className="box">
          <h3 className="title is-3">Smarter Spreadsheets (2022)</h3>
          <TechStack
            values={"NodeJS, Javascript, Gatsby, Netlify, Contentful"}
          />
          <ImageGallery items={smarterImages} lazyLoad />

          <p>
            <strong>Smarter-Spreadsheets'</strong> objective was to create a web
            presence for a former educator who wanted to alleviate the data
            responsibilities on school staff by providing a resource to help
            them do more with less. Smarter-Spreadsheets offers consulting for
            data management, improving efficiencies, and providing data
            analysis.
          </p>

          <p>
            The primary goal for this website was to give Smarter-Spreadsheets a
            web presence that describes all of the services they offer. I made a
            main webpage that immediately tells visitors what the service the
            site provides in the hero, then describes each sub-service below,
            with testimonials, a bit about the company, and a call to action.
            The sub-pages describe the services available in more detail with
            examples and videos to show how it works.
          </p>

          <p>
            Some of the content on the website is powered by Contentful so that
            I don't have to push a continuous deployment of simple text changes
            if the company wants a change in rhetoric or an alteration of a
            service. I find it very convenient and plan on using it for my other
            sites.
          </p>

          <p>
            This was my second site using Gatsby, so it was fascinating to start
            a new project from the bottom up again.
          </p>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://smarter-spreadsheets.com"
            className="button is-link is-medium is-fullwidth"
          >
            View Site
          </a>
        </div>

        <div className="box">
          <h3 className="title is-3">Bakie Scrapie (2021)</h3>
          <TechStack
            values={
              "NodeJS, Javascript, Bootstrap, RabbitMQ, Puppeteer, Amazon Comprehend, Postgres"
            }
          />
          <ImageGallery items={bakieImages} lazyLoad />
          <p>
            <strong>Bakie Scrapie's</strong> objective was to determine how many
            people enjoyed a posted recipe on a recipe blog site and what kind
            of modifications they made to the recipe. The goal was to eventually
            feed this data into a machine learning dataset so another recipe app
            could suggest favorable alterations to recipes it detected the user
            was putting together.
          </p>
          <p>
            To do this, I first needed to add the ability to add a recipe from
            any blog and scrape and parse the ingredients and the comments. To
            parse the ingredients, I tried to find the DOM element that
            contained the ingredients and passed the information to my
            ingredient parser that could separate the components of the
            ingredient, e.g. (amount, units, processing, name)
          </p>
          <p>
            Once the recipe was added, I created a worker processing queue that
            would fetch multiple pages of comments from the blog after it
            identified what type of commenting system they were using (WordPress
            comments, Disqus, custom, etc.) and then parse the blog comment.
            This was done to avoid spamming the target blog with many page
            requests - after all we were scraping data.
          </p>
          <p>
            After the comment was parsed, I would throw it at several analysis
            systems to detect if a modification was made ("I added X to the
            recipe") using lexicon parsing, if any ingredients were mentioned
            that were NOT in the original subset for the recipe, and also
            sending the comment to Amazon Comprehend to determine the overall
            sentiment and attitude of the user's comment.
          </p>
          <p>
            I also loaded data from a general recipe dataset of 10k recipes to
            provide relational data to create an adjacent graph of ingredients
            to a recipe. For example, blueberries and chocolate chips are
            commonly added ingredients in pancakes.
          </p>
        </div>

        <div className="box">
          <h3 className="title is-3">Bandit Revolvers (2009 - 2011)</h3>
          <TechStack values={"PHP, Jquery, MySql, CodeIgniter"} />
          <div className="media">
            <div className="media-left">
              <img
                alt="Bandit Revolvers Screenshot"
                src={BanditRevolersImage}
              />
            </div>
            <div className="media-content">
              <p>
                After I had closed down my old group blog website, I began to
                work on a new site that would host all of the comics and games
                that my friend and I have been working on. Due to the difficulty
                of finding a domain name that works, we decided to settle for
                the name Bandit Revolvers for our company - just because it
                sounded kinda neat.
              </p>
              <p>
                I leveraged blogging code I had made for the Apparatus Complex
                and wrapped that around a new forum that handles all of the
                authentication and provides additional interaction.
              </p>
              <ul>
                <li>
                  Fully integrated single-sign on system with a bridge between
                  the blog, the comments, and the forum.
                </li>
                <li>
                  There is an exposed API that is internally used to keep staff
                  up to date (via nightly emails) about comments, and wiki
                  modifications.
                </li>
                <li>
                  Exposed the authentication system to use one login for all
                  possible sister sites that could be related to this site.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="box">
          <h3 className="title is-3">Apparatus Complex (2003 - 2009)</h3>
          <TechStack values={"PHP, Jquery, MySql, CodeIgniter"} />
          <div className="media">
            <div className="media-left">
              <img alt="Apparatus Complex Screenshot" src={ApparatusImages} />
            </div>
            <div className="media-content">
              <h4>History</h4>
              <p>
                The very first iteration of this website was a project page on
                Geocities. Then I moved it to a group blog format on Tripod, and
                then to Blogger.com way before it was owned by Google. In an
                effort to bring more people into the site, I turned it into a
                public forum around mid 2003. Between 2003 and 2005 we had
                around 140 registered people on the site.
              </p>
              <p>
                Then the site was dormant from 2005 to 2008, while I was busy
                with school and went through a period of being sick of
                administrating websites. Basically the site was drawing in a
                crowd of people that I didn’t like, and they were maneuvering
                the site in a social direction that I didn't desire.
              </p>
              <p>
                An interesting way to look back on the history is to look at it
                using the{" "}
                <a href="http://web.archive.org/web/*/http://www.apparatuscomplex.com">
                  Internet Archive Wayback Machine
                </a>
                . It's a little scary to see what life was like for me 5-6 years
                ago.
              </p>
              <p>
                In 2009, I decided to bring the site back. The first reason is
                that I'm older now, and so were the original members of the site
                so we could provide more interesting conversations. The second
                reason was that I honestly didn’t want to waste a domain name
                that I was paying for.
              </p>
              <p>
                So that time decided to go with a discussion-forum in a blog
                like format. People really liked the openness of the forums, but
                they also enjoyed the intimacy of the blog format. I’m had an
                algorithm to determine which posts are front-page worthy and
                people were assigned points to provide a bit of competition.
              </p>
              <p>
                Unfortunately, despite of the work I put into the site it
                suffered from a low visitor volume and low rant submissions. Of
                course this was partly due to various social networks becoming
                the defacto standard and micro blogging services that provided
                better rewards for shorter posts than longer ones. Instead of
                putting anymore work into the site I decided to close it down in
                November 2009, and promptly sold off the domain.
              </p>
              <ul>
                <li>Used JQuery for front-end commenting and posting.</li>
                <li>
                  Custom made back-end administration and CMS using Php and
                  MySQL with support for multiple authors with various
                  permissions.
                </li>
                <li>
                  Automatic tag generation using results from Yahoo's Term
                  Extractor API, and OpenCalais
                </li>
              </ul>
            </div>
          </div>
        </div>
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
    bakie: allFile(
      sort: { name: ASC }
      filter: { relativeDirectory: { eq: "projects/bakie-scrapie" } }
    ) {
      nodes {
        id
        publicURL
        relativeDirectory
        name
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 300)
        }
      }
    }
    smarter: allFile(
      sort: { name: ASC }
      filter: { relativeDirectory: { eq: "projects/smarter-spreadsheets" } }
    ) {
      nodes {
        id
        publicURL
        relativeDirectory
        name
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 300)
        }
      }
    }
  }
`

export default Projects
