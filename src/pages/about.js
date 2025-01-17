import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = ({ data }) => {
  const about = data.contentfulAboutPage
  const img = getImage(about?.image)

  return (
    <Layout>
      <Seo title="About Me" />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>About Me</h1>
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          {img && (
            <div style={{ flex: "0 0 300px" }}>
              <GatsbyImage
                image={img}
                alt={about?.title || "Profile"}
                style={{ borderRadius: "8px" }}
              />
            </div>
          )}
          <div>
            <h2 style={{ marginBottom: "1rem" }}>{about?.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: about?.description?.description,
              }}
              style={{ lineHeight: 1.6 }}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query AboutPageQuery {
    contentfulAboutPage {
      title
      description {
        description
      }
      image {
        gatsbyImageData(width: 600, quality: 90)
      }
    }
  }
`

export default AboutPage
