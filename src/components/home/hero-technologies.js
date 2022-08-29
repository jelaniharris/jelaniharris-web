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
            <p className="subtitle">I've worked with a large range of technologies in the development world</p>
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
                <p>Node.Js, ExpressJs, NestJs, PHP, Laravel, Rails/Ruby, Postgres, MySql, OracleSql, MSSql, Python, Apache / NingX</p>
              </div>
            </div>
            <div className="column">
              <div className="column-content">
                <h4 className="title is-4"><FontAwesomeIcon icon={faCloud} /> Cloud</h4>
                <p>AWS, Heroku, Digital Ocean</p>
              </div>
            </div>
            <div className="column">
              <div className="column-content">
                <h4 className="title is-4"><FontAwesomeIcon icon={faTools} /> Tools</h4>
                <p>Git, Webpack, Bootstrap, VS Code</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    )
}

export default HeroTechnologies