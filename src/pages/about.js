import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  Container,
  Title,
  FlexContainer,
  ImageWrapper,
  ContentWrapper,
  Description
} from "../components/ProfileSection"

const AboutPage = ({ data }) => {
  const about = data.contentfulAboutPage
  const img = getImage(about?.image)

  return (
    <Layout>
      <Seo title="About Me" />
      <Container>
        <Title>About Me</Title>
        <FlexContainer>
          {img && (
            <ImageWrapper>
              <GatsbyImage
                image={img}
                alt={about?.title || "Profile"}
                style={{ borderRadius: "8px" }}
              />
            </ImageWrapper>
          )}
          <ContentWrapper>
            <h2>{about?.title}</h2>
            <Description
              dangerouslySetInnerHTML={{
                __html: about?.description?.description,
              }}
            />
          </ContentWrapper>
        </FlexContainer>
      </Container>
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
