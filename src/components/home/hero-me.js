import * as React from "react"
import SocialIcons from "../social-icons";
import HeroLogo from "../../images/hero_logo.png"

const HeroMe = () => {
    return (
        <section className="hero is-large has-background front-hero-me">
          <img src={HeroLogo} alt="Space Background with Logo in Front" className="hero-background is-transparent" />
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