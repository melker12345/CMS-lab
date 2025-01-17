import React from "react"
import styled from "styled-components"

const SearchContainer = styled.div`
  margin: 2rem auto;
  max-width: 600px;
  width: 90%;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #666;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`

const SearchBar = ({ value, onChange }) => {
  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search projects..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </SearchContainer>
  )
}

export default SearchBar
