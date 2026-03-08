import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

const TowerOfGreedCallout = () => (
  <div className="message is-info mt-5">
    <div className="message-body">
      <article className="media">
        <figure className="media-left">
          <StaticImage
            src="../../images/projects/tower-of-greed/TowerOfGreed_Mini.png"
            alt="Tower of Greed gameplay screenshot"
            layout="fixed"
            width={200}
            quality={80}
          />
        </figure>
        <div className="media-content">
          <p className="title is-5">Try Tower of Greed!</p>
          <p className="mb-3">
            Tower of Greed is a procedurally generated 3D dungeon crawler playable in your browser built
            with React, Three.js, and Next.js. Descend into the tower, collect
            loot, and see how deep you can go — but watch out, greed comes at a
            price.
          </p>
          <a
            href="https://tower-of-greed.vercel.app"
            className="button is-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Play Now →
          </a>
        </div>
      </article>
    </div>
  </div>
)

const ProjectCallout = ({ tags }) => {
  if (!tags?.includes("tower-of-greed")) return null
  return <TowerOfGreedCallout />
}

export default ProjectCallout
