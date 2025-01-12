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
          const isGithubRepo = project.projectUrl?.includes("github.com")

          return (
            <div
              key={project.id}
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
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
                <h2 style={{ marginBottom: "1rem", color: "#333" }}>{project.title}</h2>
                <p style={{ 
                  marginBottom: "1.5rem", 
                  color: "#666",
                  minHeight: "4.5em",
                  lineHeight: "1.5"
                }}>
                  {project.description?.description}
                </p>
                <div style={{ 
                  display: "flex", 
                  gap: "1rem",
                  justifyContent: "flex-start",
                  alignItems: "center" 
                }}>
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: isGithubRepo ? "#24292e" : "var(--color-primary)",
                        color: "white",
                        padding: "0.75rem 1.25rem",
                        borderRadius: "4px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        transition: "transform 0.2s",
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      {isGithubRepo ? (
                        <>
                          <svg height="20" width="20" viewBox="0 0 16 16" style={{ fill: "white" }}>
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                          </svg>
                          View on GitHub
                        </>
                      ) : (
                        "Visit Project"
                      )}
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
