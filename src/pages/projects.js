import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ProjectsPage = ({ data }) => {
  const projects = data.allContentfulProject.nodes

  return (
    <Layout>
      <Seo title="Projects" />
      <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>My Projects</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        {projects.map(project => {
          const projectImage = getImage(project.image)
          return (
            <div
              key={project.id}
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.2s",
                ":hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              {projectImage && (
                <GatsbyImage
                  image={projectImage}
                  alt={project.title}
                  style={{ height: 200 }}
                />
              )}
              <div style={{ padding: "1.5rem" }}>
                <h2 style={{ marginBottom: "1rem" }}>{project.title}</h2>
                <p style={{ marginBottom: "1.5rem" }}>{project.description.description}</p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Link
                    to={`/project/${project.slug}`}
                    style={{
                      background: "var(--color-primary)",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                      textDecoration: "none",
                    }}
                  >
                    View Details
                  </Link>
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#333",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        textDecoration: "none",
                      }}
                    >
                      Visit Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectsQuery {
    allContentfulProject {
      nodes {
        id
        title
        slug
        projectUrl
        description {
          description
        }
        image {
          gatsbyImageData(width: 600, height: 400, quality: 90)
        }
      }
    }
  }
`

export default ProjectsPage
