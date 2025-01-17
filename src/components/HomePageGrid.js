import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4rem;
  row-gap: 4rem;
  margin: 4rem auto;
  max-width: 100%;
  padding: 0 2rem;  
  position: relative;
  padding-bottom: 4rem;

  & > * {
    &:nth-child(even) {
      margin-top: 8rem;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    
    & > * {
      &:nth-child(even) {
        margin-top: 0;
      }
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const StyledExternalLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const HomePageGrid = ({ children }) => {
  return (
    <Grid>
      {React.Children.map(children, child => {
        const project = child.props.project;
        
        // If it's a contentfulProject (has projectUrl), use external link
        if (project.projectUrl) {
          return (
            <StyledExternalLink 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {child}
            </StyledExternalLink>
          );
        }
        
        // Otherwise, it's a HomePageCard, use internal link
        const slug = project.slug;
        return (
          <StyledLink to={`/project/${slug}`}>
            {child}
          </StyledLink>
        );
      })}
    </Grid>
  );
};

export default HomePageGrid;
