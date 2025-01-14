import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ContactPage = ({ data }) => {
  const contact = data.contentfulContact

  return (
    <Layout>
      <Seo title="Contact" />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Contact Me</h1>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            {contact?.description?.description}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem",
                  background: "var(--color-primary)",
                  color: "white",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                Email Me
              </a>
            )}
            {contact?.linkedInUrl && (
              <a
                href={contact.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem",
                  background: "#0077b5",
                  color: "white",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                LinkedIn
              </a>
            )}
            {contact?.gitHubUrl && (
              <a
                href={contact.gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem",
                  background: "#333",
                  color: "white",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ContactQuery {
    contentfulContact {
      description {
        description
      }
    email
    linkedInUrl
    gitHubUrl
    }
  }
`

export default ContactPage
