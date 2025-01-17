import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const ProjectContainer = styled.article`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProjectHeader = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`;

const ProjectTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ProjectImage = styled.div`
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProjectContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
`;

const ProjectLinks = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ProjectLink = styled.a`
  padding: 0.8rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

const ProjectTemplate = ({ data }) => {
  const project = data.contentfulProject || data.contentfulHomePageCard
  const image = getImage(project.image)

  return (
    <Layout>
      <Seo title={project.title} description={project.description?.description} />
      <ProjectContainer>
        <ProjectHeader>
          <ProjectTitle>{project.title}</ProjectTitle>
        </ProjectHeader>

        <ProjectImage>
          <GatsbyImage image={image} alt={project.title} />
        </ProjectImage>

        <ProjectContent>
          <div dangerouslySetInnerHTML={{ __html: project.description?.description }} />
        </ProjectContent>

        {project.projectUrl && (
          <ProjectLinks>
            <ProjectLink href={project.projectUrl} target="_blank" rel="noopener noreferrer">
              View Project
            </ProjectLink>
          </ProjectLinks>
        )}
      </ProjectContainer>
    </Layout>
  )
}

export const query = graphql`
  query ProjectQuery($id: String!) {
    contentfulProject(id: { eq: $id }) {
      title
      description {
        description
      }
      image {
        gatsbyImageData(quality: 100)
      }
      projectUrl
    }
    contentfulHomePageCard(id: { eq: $id }) {
      title
      description {
        description
      }
      image {
        gatsbyImageData(quality: 100)
      }
      previewVideo {
        file {
          url
        }
      }
    }
  }
`

export default ProjectTemplate
