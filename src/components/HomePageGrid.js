import styled from "styled-components";

const HomePageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  margin: 4rem auto;
  max-width: 1200px;

  & > div:nth-child(odd) {
    grid-column: 1 / span 8; /* Align left */
  }

  & > div:nth-child(even) {
    grid-column: 5 / span 8; /* Align right */
  }
`;

export default HomePageGrid;
