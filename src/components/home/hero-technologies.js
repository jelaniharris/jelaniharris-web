import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloud, faDatabase, faTools } from "@fortawesome/free-solid-svg-icons"
import { faReact } from "@fortawesome/free-brands-svg-icons"
import { Tooltip } from "react-tooltip"

// Front-End
import typescript_icon from "../../images/icons/tech/typescript.png"
import javascript from "../../images/icons/tech/js.png"
import react_icon from "../../images/icons/tech/reactjs.png"
import redux_icon from "../../images/icons/tech/redux.png"
import html5 from "../../images/icons/tech/html5.png"
import css from "../../images/icons/tech/css3.png"
import nodejs from "../../images/icons/tech/nodejs.png"
import sass from "../../images/icons/tech/sass.png"
import material_ui from "../../images/icons/tech/material-ui.png"
import tailwind from "../../images/icons/tech/tailwind.png"

// Back-End
import rails from "../../images/icons/tech/rails.png"
import nextjs from "../../images/icons/tech/nextjs.png"
import redis from "../../images/icons/tech/redis.png"
import apache from "../../images/icons/tech/apache.png"
import php_icon from "../../images/icons/tech/php.png"
import laravel_icon from "../../images/icons/tech/laravel.png"
import mysql from "../../images/icons/tech/mysql.png"
import postgres from "../../images/icons/tech/postgresql.png"
import python from "../../images/icons/tech/python.png"
import graphql_icon from "../../images/icons/tech/graphql.png"

// Tools
import vs_icon from "../../images/icons/tech/vs.png"
import photoshop from "../../images/icons/tech/ps.png"
import bootstrap from "../../images/icons/tech/bootstrap4.png"
import github from "../../images/icons/tech/github.png"
import gitlab from "../../images/icons/tech/gitlab.png"

import docker from "../../images/icons/tech/docker.png"
import webpack from "../../images/icons/tech/webpack.png"

// Infrastructure
import aws from "../../images/icons/tech/aws.png"
import heroku from "../../images/icons/tech/heroku.png"
import digitalocean from "../../images/icons/tech/digitalOcean.png"

const HeroTechnologies = () => {
  const techImages = {
    "front-end": [
      { name: "HTML 5", data: html5 },
      { name: "CSS 3", data: css },
      { name: "SASS", data: sass },
      { name: "Tailwind CSS", data: tailwind },
      { name: "Material UI", data: material_ui },
      { name: "Javascript", data: javascript },
      { name: "TypeScript", data: typescript_icon },
      { name: "ReactJS", data: react_icon },
      { name: "Redux", data: redux_icon },
    ],
    "back-end": [
      { name: "NodeJs", data: nodejs },
      { name: "NextJS", data: nextjs },
      { name: "PHP", data: php_icon },
      { name: "Ruby On Rails", data: rails },
      { name: "Python", data: python },
      { name: "Laravel", data: laravel_icon },
      { name: "MySQL", data: mysql },
      { name: "PostgreSQL", data: postgres },
      { name: "GraphQL", data: graphql_icon },
      { name: "Redis", data: redis },
      { name: "Apache", data: apache },
    ],
    infrastructure: [
      { name: "Amazon Web Services", data: aws },
      { name: "Heroku", data: heroku },
      { name: "Digital Ocean", data: digitalocean },
    ],
    tools: [
      { name: "VS Code", data: vs_icon },
      { name: "Photoshop", data: photoshop },
      { name: "Bootstrap", data: bootstrap },
      { name: "GitHub", data: github },
      { name: "GitLab", data: gitlab },
      { name: "Docker", data: docker },
      { name: "Webpack", data: webpack },
    ],
  }

  const DisplayTechnologyGrid = ({ type }) => {
    const techData = techImages[type]

    return (
      <div className="techgridflow">
        {techData.map(tech => {
          return (
            <div
              data-tooltip-id="my-tooltip"
              data-tooltip-content={tech.name}
              className="image is-64x64 techimage"
              key={tech.name}
            >
              <img src={tech.data} alt={tech.name} />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <section className="hero is-small front-hero-technologies">
      <div className="hero-body">
        <div className="container">
          <section className="block has-text-centered">
            <h2 className="title is-2">Technologies</h2>
            <p className="subtitle">
              I've worked with a ton of technologies in my career and personal
              projects. I really enjoy learning new stuff and I tend to post
              about what I learn here.
            </p>
          </section>
          <div className="columns">
            <div className="column">
              <div className="column-content">
                <h4 className="title is-4">
                  <FontAwesomeIcon icon={faReact} /> Front-End
                </h4>
                <DisplayTechnologyGrid type="front-end" />
              </div>
            </div>
            <div className="column">
              <div className="column-content">
                <h4 className="title is-4">
                  <FontAwesomeIcon icon={faDatabase} /> Back-End
                </h4>
                <DisplayTechnologyGrid type="back-end" />
              </div>
            </div>
            <div className="column">
              <div className="column-content">
                <h4 className="title is-4">
                  <FontAwesomeIcon icon={faCloud} /> Infrastructure
                </h4>
                <DisplayTechnologyGrid type="infrastructure" />
              </div>
            </div>
            <div className="column">
              <div className="column-content">
                <h4 className="title is-4">
                  <FontAwesomeIcon icon={faTools} /> Tools
                </h4>
                <DisplayTechnologyGrid type="tools" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </section>
  )
}

export default HeroTechnologies
