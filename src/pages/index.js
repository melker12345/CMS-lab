import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ProjectCard from "../components/ProjectCard"
import styled from "styled-components"

const ProjectsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin: 4rem auto;
  max-width: 1200px;
  padding: 0 1rem;
`

const IndexPage = ({ data }) => {
  const home = data?.allContentfulHomePage?.nodes[0]
  const projects = data?.allContentfulProject?.nodes || []
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

      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            isEven={index % 2 === 1}
          />
        ))}
      </ProjectsGrid>
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
          gatsbyImageData(width: 400, placeholder: BLURRED)
        }
      }
    }
    allContentfulProject {
      nodes {
        id
        title
        description {
          description
        }
        image {
          gatsbyImageData(width: 800, height: 450, placeholder: BLURRED)
        }
      }
    }
  }
`

export default IndexPage
