import * as React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faDatabase, faTools } from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";

const HeroTechnologies = () => {
    return (
        <section className="hero is-small front-hero-technologies">
        <div className="hero-body">
        <div className="container">

          <section className="block has-text-centered">
            <h2 className="title is-2">Technologies</h2>
            <p className="subtitle">I've worked with a ton of technologies in my career and personal projects. I really enjoy learning new stuff and I tend to post about what I learn here.</p>
          </section>
          <div className="columns">
            <div className="column">
              <div className="column-content">
                <h4 className="title is-4"><FontAwesomeIcon icon={faReact} /> Front-End</h4>
                <p>HTML, CSS, SASS, Javascript, React, Redux, MobX</p>
              </div>
            </div>
            <div className="column">
              <div className="column-content">
                <h4 className="title is-4"><FontAwesomeIcon icon={faDatabase} /> Back-End</h4>
                <p>Node.Js, ExpressJs, NestJs, NextJs, PHP, Laravel, Ruby/Rails, Postgres, MySql, OracleSql, MSSql, Python, Apache / NingX</p>
              </div>
            </div>
            <div className="column">
              <div className="column-content">
                <h4 className="title is-4"><FontAwesomeIcon icon={faCloud} /> Infrastructure</h4>
                <p>AWS, Heroku, Digital Ocean</p>
              </div>
            </div>
            <div className="column">
              <div className="column-content">
                <h4 className="title is-4"><FontAwesomeIcon icon={faTools} /> Tools</h4>
                <p>Git, Webpack, Bootstrap, VS Code, TailwindCSS</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    )
}

export default HeroTechnologies