import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${props => props.$withBackground ? 'rgba(0, 0, 0, 0.1)' : 'transparent'};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const ImageWrapper = styled.div`
  flex: 0 0 300px;

  @media (max-width: 768px) {
    flex: 0 0 auto;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;

  h2 {
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Description = styled.div`
  line-height: 1.6;
`;
