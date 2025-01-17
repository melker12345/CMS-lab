import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled, { keyframes } from "styled-components"

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  margin: 0;
  color: var(--color-primary);
  animation: ${float} 3s ease-in-out infinite;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 1rem 0 2rem;
  color: #333;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const NotFoundPage = () => {
  return (
    <Layout>
      <Container>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Message>
          Oops! Looks like you've ventured into uncharted territory. 
          The page you're looking for seems to have gone on an adventure without us.
        </Message>
        <StyledLink to="/">
          Return to Homepage
        </StyledLink>
      </Container>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
