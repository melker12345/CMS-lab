import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import SearchBar from "../components/SearchBar"

const BlogGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BlogPost = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding: 2rem;
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const BlogTitle = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;

const BlogExcerpt = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PublishDate = styled.time`
  color: #888;
  font-size: 0.9rem;
`;

const BlogPage = ({ data }) => {
  const [searchTerm, setSearchTerm] = React.useState("")
  
  const filteredPosts = data.allContentfulBlogPosts.nodes.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <Seo title="Blog" />
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Blog Posts</h1>
      
      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <BlogGrid>
        {filteredPosts.map((post) => (
          <BlogPost key={post.id} to={`/blog/${post.id}`}>
            <GatsbyImage
              image={getImage(post.coverImage)}
              alt={post.title}
              style={{ height: "100%", minHeight: "200px" }}
            />
            <div>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <PublishDate>
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </PublishDate>
            </div>
          </BlogPost>
        ))}
      </BlogGrid>
    </Layout>
  )
}

export const query = graphql`
  query BlogListQuery {
    allContentfulBlogPosts(sort: { publishDate: DESC }) {
      nodes {
        id
        title
        slug
        excerpt
        publishDate
        coverImage {
          gatsbyImageData(
            width: 400
            height: 300
            quality: 85
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  }
`

export default BlogPage
