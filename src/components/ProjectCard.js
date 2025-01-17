import React, { useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const Card = styled.div`
  position: relative;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
`;

const VideoOverlay = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${({ isHovered }) => (isHovered ? "block" : "none")};
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #333;
`;

const Description = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.5;
`;

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const image = getImage(project.image);
  const hasVideo = project.previewVideo?.file?.url;

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageContainer>
        <GatsbyImage
          image={image}
          alt={project.title}
          style={{ height: "100%" }}
        />
        {hasVideo && (
          <VideoOverlay
            isHovered={isHovered}
            src={project.previewVideo.file.url}
            autoPlay
            loop
            muted
          />
        )}
      </ImageContainer>
      <Content>
        <Title>{project.title}</Title>
        <Description>{project.description?.description || ""}</Description>
      </Content>
    </Card>
  );
};

export default ProjectCard;
