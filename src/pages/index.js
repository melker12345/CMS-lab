import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ProjectCard from "../components/ProjectCard"
import HomePageGrid from "../components/HomePageGrid"
import styled from "styled-components"

const IndexPage = ({ data }) => {
  const HomePage = data.contentfulHomePage
  const HomePageImage = HomePage?.profileImage?.gatsbyImageData ? getImage(HomePage.profileImage) : null
  const homePageCards = data.allContentfulHomePageCard.nodes
  const seoImageUrl = HomePage?.profileImage?.file?.url

  return (
    <Layout>
      <Seo 
        title={HomePage?.title || "Home"}
        description={HomePage?.description?.description}
        image={seoImageUrl}
      />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem", backgroundColor: "rgba(0, 0, 0, 0.1" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}></h1>
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          {HomePageImage && (
            <div style={{ flex: "0 0 300px" }}>
              <GatsbyImage
                image={HomePageImage}
                alt={HomePage?.title || "Profile"}
                style={{ borderRadius: "8px" }}
              />
            </div>
          )}
          <div>
            <h2 style={{ marginBottom: "1rem" }}>{HomePage?.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: HomePage?.description?.description,
              }}
              style={{ lineHeight: 1.6 }}
            />
          </div>
        </div>
      </div>

      <HomePageGrid>
        {homePageCards.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project}
          />
        ))}
      </HomePageGrid>
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    contentfulHomePage {
      title
      description {
        description
      }
      profileImage {
        gatsbyImageData(
          width: 600
          quality: 90
          layout: CONSTRAINED
          placeholder: BLURRED
        )
        file {
          url
        }
      }
    }
    allContentfulHomePageCard {
      nodes {
        id
        title
        slug
        description {
          description
        }
        image {
          gatsbyImageData(
            width: 800
            quality: 100
            layout: CONSTRAINED
            placeholder: BLURRED
          )
          file {
            url
          }
        }
        previewVideo {
          file {
            url
          }
        }
      }
    }
  }
`

export default IndexPage
