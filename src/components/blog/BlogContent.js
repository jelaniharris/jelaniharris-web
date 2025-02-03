import * as React from "react"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { GatsbyImage } from "gatsby-plugin-image"
import { FigureCaption } from "../common/FigureCaption"
import { Link } from "gatsby"

const Bold = ({ children }) => <strong>{children}</strong>
const Text = ({ children }) => <p>{children}</p>
const Italics = ({ children }) => <em>{children}</em>

/*
    return (
      <section
      className="content"
      dangerouslySetInnerHTML={{ __html: documentStr }}
      itemProp="articleBody"
    />
    )
    */

const BlogContent = ({ post }) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      [MARKS.ITALICS]: text => <Italics>{text}</Italics>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        /*if (node.data.target.sys.contentType.sys.id === "codeBlock") {
          return (
            <pre>
              <code>{node.data.target.fields.code}</code>
            </pre>
          );
        }
  
        if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
          return (
            <iframe
              src={node.data.target.fields.embedUrl}
              height="100%"
              width="100%"
              frameBorder="0"
              scrolling="no"
              title={node.data.target.fields.title}
              allowFullScreen={true}
            />
          );
        }*/
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {

        const imageID = node.data.target.sys.id
        const referenceFile = post.content.references.find(
          ({ contentful_id: id }) => id === imageID
        )

        if (!referenceFile) {
          return (
            <span style={{ backgroundColor: "red" }}>
              Embedded asset reference not found
            </span>
          )
        }

        const { file, title } = referenceFile

        if (!file) {
          return (
            <span style={{ backgroundColor: "red" }}>
              Embedded asset not found
            </span>
          )
        }

        const mimeType = file.contentType ?? file["en-US"].contentType
        const mimeGroup = mimeType.split("/")[0]

        switch (mimeGroup) {
          case "image":
            if (referenceFile.gatsbyImageData) {
              return (
                <div className="card mb-5">
                  <div className="card-image">
                    <figure className="inline-post-image mb-2">
                      <a
                        href={file.url ?? file["en-US"].url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GatsbyImage
                          image={referenceFile.gatsbyImageData}
                          alt={title ? title["en-US"] : null}
                        />
                      </a>
                    </figure>
                  </div>
                  <div className="card-content">
                    <FigureCaption
                      featuredAlt={title ?? title["en-US"] ?? ""}
                    />
                  </div>
                </div>
              )
            }

            return (
              <img
                title={title ? title["en-US"] : null}
                src={file.url ?? file["en-US"].url}
                alt={title ? title["en-US"] : null}
              />
            )
          default:
            return (
              <span style={{ backgroundColor: "red" }}>
                {mimeType} embedded asset
              </span>
            )
        }
      },
    },
  }

  if (post.html) {
    return (
      <section
        className="content"
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
    )
  } else {
    console.log(post.content.raw)
    const reactComponents = documentToReactComponents(
      JSON.parse(post.content.raw),
      options
    )
    return (
      <section className="content" itemProp="articleBody">
        {reactComponents}
      </section>
    )
  }
}

export default BlogContent
