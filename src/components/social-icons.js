import * as React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons';

const SocialIcons = (props) => {
  return (
    <div {...props}>
      <a href="https://www.facebook.com/jelaniharris" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a href="https://twitter.com/jelaniharris" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="https://www.linkedin.com/in/jelaniharris/" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a href="https://www.github.com/jelaniharris/" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  )
}

export default SocialIcons
