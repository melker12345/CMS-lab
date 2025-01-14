import React, { useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import HomePageGrid from "../components/HomePageGrid";
import Modal from "../components/Modal";
import styled from "styled-components";

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
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;

  .gatsby-image-wrapper {
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ isVideoVisible }) => (isVideoVisible ? 0 : 1)};
  }
`;

const VideoOverlay = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const Description = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0.5rem 0 0 0;
`;

const IndexPage = ({ data }) => {
  const HomeProjects = data.allContentfulHomePageCard.nodes;
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [showVideoIndex, setShowVideoIndex] = useState(null);
  const [videoRefs] = useState(() => Array(HomeProjects.length).fill(null).map(() => React.createRef()));

  const HomePage = data.contentfulHomePage;
  const HomePageImage = getImage(HomePage?.profileImage);

  const handleMouseEnter = (index) => {
    setHoveredCardIndex(index);
    
    // Reset video to start
    if (videoRefs[index].current) {
      videoRefs[index].current.currentTime = 0;
    }

    // Delay showing the video
    setTimeout(() => {
      setShowVideoIndex(index);
    }, 50);
  };

  const handleMouseLeave = () => {
    setHoveredCardIndex(null);
    setShowVideoIndex(null); // Reset video display
  };

  return (
    <Layout>
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
        {HomeProjects.map((project, index) => {
          const image = getImage(project.image);
          const videoUrl = project.previewVideo.file.url;

          return (
            <Card
              key={project.id}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <ImageContainer isVideoVisible={showVideoIndex === index}>
                <GatsbyImage image={image} alt={project.title} />
                <VideoOverlay
                  ref={videoRefs[index]}
                  isVisible={showVideoIndex === index} // Show video only when the delay is complete
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                />
              </ImageContainer>
              <div style={{ padding: "1rem" }}>
                <Title>{project.title}</Title>
                <Description>{project.description.description}</Description>
              </div>
            </Card>
          );
        })}
      </HomePageGrid>

      {selectedProject && (
        <Modal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Layout>
  );
};

export const query = graphql`
  query HomePageQuery {
    contentfulHomePage {
      title
      description {
        description
      }
      profileImage {
        gatsbyImageData(width: 600, quality: 90)
      }
    } 
    allContentfulHomePageCard {
      nodes {
        id
        title
        description {
          description
        }
        image {
          gatsbyImageData( quality: 100)
        }
        previewVideo {
          file {
            url
          }
        }
      }
    }
  }
`;

export default IndexPage;
