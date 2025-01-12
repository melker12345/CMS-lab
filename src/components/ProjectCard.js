import React, { useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`

const ImageContainer = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
`

const Content = styled.div`
  padding: 1.5rem;
`

const Title = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #333;
`

const Description = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.5;
`

const ProjectCard = ({ project, isEven }) => {
  const [isHovered, setIsHovered] = useState(false)
  const image = getImage(project.image)

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        marginLeft: isEven ? 'auto' : '0',
        marginRight: isEven ? '0' : 'auto',
        width: '90%',
      }}
    >
      <ImageContainer>
        <GatsbyImage
          image={image}
          alt={project.title}
          style={{ height: '100%' }}
        />
      </ImageContainer>
      <Content>
        <Title>{project.title}</Title>
        <Description>{project.description?.description || ''}</Description>
      </Content>
    </Card>
  )
}

export default ProjectCard
