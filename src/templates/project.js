import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ProjectTemplate = ({ data }) => {
  const project = data.contentfulProject
  const projectImage = getImage(project.image)

  return (
    <Layout>
      <Seo title={project.title} />
      <article style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
        {projectImage && (
          <GatsbyImage
            image={projectImage}
            alt={project.title}
            style={{ borderRadius: "8px", marginBottom: "2rem" }}
          />
        )}
        <h1 style={{ marginBottom: "1rem" }}>{project.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: project.description.description,
          }}
          style={{ marginBottom: "2rem" }}
        />
        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "var(--color-primary)",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Visit Project
          </a>
        )}
      </article>
    </Layout>
  )
}

export const query = graphql`
  query ProjectQuery($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      title
      projectUrl
      description {
        description
      }
      image {
        gatsbyImageData(width: 800, quality: 90)
      }
    }
  }
`

export default ProjectTemplate
