import * as React from "react"
import SocialIcons from "../social-icons";

const HeroMe = () => {
    return (
        <section className="hero is-medium front-hero-me">
        <div className="hero-body">
          <div className="container has-text-centered">
          <h1 className="title is-1">Hi, I'm <span className="has-text-weight-bold">Jelani</span></h1>
          <p className="subtitle">I'm a Senior Full Stack Software Engineer</p>
          </div>
        </div>
        <div className="hero-foot">
          <div className="container has-text-centered">
          <div className="social-icons">
            <SocialIcons />
          </div>
          </div>
        </div>
      </section>
    )
}

export default HeroMe