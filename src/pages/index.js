import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const home = data?.allContentfulHomePage?.nodes[0]
  const profileImage = getImage(home?.profileImage)

  if (!home) {
    return (
      <Layout>
        <Seo title="Home" />
        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <h1>Welcome</h1>
          <p>Content is loading or not available. Please check your Contentful setup.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo title="Home" />
      <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
        {profileImage && (
          <GatsbyImage
            image={profileImage}
            alt={home?.title || "Profile"}
            style={{ borderRadius: "50%", width: 200, height: 200, margin: "0 auto" }}
          />
        )}
        <h1 style={{ marginTop: "2rem" }}>{home?.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: home?.description?.description,
          }}
          style={{ marginTop: "1rem" }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    allContentfulHomePage {
      nodes {
        title
        description {
          description
        }
        profileImage {
          gatsbyImageData(width: 400, quality: 90)
        }
      }
    }
  }
`

export default IndexPage
