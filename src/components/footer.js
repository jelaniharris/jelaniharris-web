import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, limit: 4 ) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  width: 75
                  placeholder: BLURRED
                  formats: [AUTO]
                )
              }
            }
          }
        }
      }
    }
`);

  const nodes = data.allMarkdownRemark.nodes;

  const RecentPosts = ({posts}) => {
    if (posts.length === 0) {
      return <></>;
    }

    const renderPost = (postData) => {
      const featuredImgThumbail = getImage(postData.frontmatter.featuredImage) || null;
      let ImageElement;
      if (featuredImgThumbail) {
        ImageElement = <GatsbyImage
          className="recent-blog-featured-image"
          layout="constraint"
          formats={["auto", "webp", "avif"]}
          image={featuredImgThumbail}
          width={75}
          height={75}
          quality={75}
          alt="Post Thumbnail"
        />;
      } else {
        ImageElement = <div style={{width: 75}}></div>;
      }
      return (
        <div key={`recent-post-${postData.fields.slug}`} className="recent-post-entry">
          <div className="media">
            <figure className="media-left">
              {ImageElement}
            </figure>
            <div className="media-right is-flex-shrink-1">
              <Link className="is-size-5" to={postData.fields.slug}>{postData.frontmatter.title}</Link>
              <p className="is-size-6">{postData.frontmatter.description || postData.excerpt}</p>
              <p className="is-size-6">{postData.frontmatter.date}</p>
            </div>
          </div>
        </div>
      )
    };

    return (
      <>
        <h3 className="title is-3">Recent Posts</h3>
        {posts.map(post => renderPost(post))}
      </>
    )
  }

  return (
    <footer className="page-footer">
      <div className="pre-footer py-3">
        <section className="container">
          <div className="columns">
            <div className="column is-6">
              <RecentPosts posts={nodes}/>
            </div>
            <div className="column is-6">
            </div>
          </div>
        </section>
      </div>
      <div className="copyright-social p-4">
        <section className="container">
          <div className="is-flex is-flex-direction-row is-justify-content-space-between">
          <div>
            © {new Date().getFullYear()} Jelani Harris
            <span>
              , Built with care and
              {` `}
              <a href="https://www.gatsbyjs.com">Gatsby</a>
              {` `} &amp; {` `} <a href="https://www.markdownguide.org/">Markdown</a>
              {` `}
              | All Rights Reserved
            </span>
          </div>
          <div className="" id="f_social_icons">
            <a href="https://www.facebook.com/jelaniharris" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com/jelaniharris" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
              </a>
            <a href="https://www.linkedin.com/in/jelaniharris/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer
