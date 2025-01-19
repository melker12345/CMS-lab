import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ProjectCard from "../components/ProjectCard"
import HomePageGrid from "../components/HomePageGrid"
import styled from "styled-components"
import {
  Container,
  FlexContainer,
  ImageWrapper,
  ContentWrapper,
  Description
} from "../components/ProfileSection"

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
      <Container $withBackground>
        <FlexContainer>
          {HomePageImage && (
            <ImageWrapper>
              <GatsbyImage
                image={HomePageImage}
                alt={HomePage?.title || "Profile"}
                style={{ borderRadius: "8px" }}
              />
            </ImageWrapper>
          )}
          <ContentWrapper>
            <h2>{HomePage?.title}</h2>
            <Description
              dangerouslySetInnerHTML={{
                __html: HomePage?.description?.description,
              }}
            />
          </ContentWrapper>
        </FlexContainer>
      </Container>

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
