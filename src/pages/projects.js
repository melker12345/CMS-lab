import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ProjectCard from "../components/ProjectCard"
import SearchBar from "../components/SearchBar"
import HomePageGrid from "../components/HomePageGrid"
import styled from "styled-components"

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 4rem auto;
  padding: 0 2rem;
`;

const ProjectsPage = ({ data }) => {
  const [searchTerm, setSearchTerm] = React.useState("")
  
  // Combine both types of projects
  const allProjects = [
    ...data.allContentfulHomePageCard.nodes,
    ...data.allContentfulProject.nodes
  ]
  
  const filteredProjects = allProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <Seo title="Projects" />
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>My Projects</h1>
      
      <SearchContainer>
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </SearchContainer>

      <HomePageGrid>
        {filteredProjects.map((project) => (
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
  query ProjectsQuery {
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
            width: 600
            quality: 85
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
        previewVideo {
          file {
            url
          }
        }
      }
    }
    allContentfulProject {
      nodes {
        id
        title
        slug
        description {
          description
        }
        image {
          gatsbyImageData(
            width: 600
            quality: 85
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
        projectUrl
      }
    }
  }
`

export default ProjectsPage
