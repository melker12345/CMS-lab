import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const BlogPostContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BlogHeader = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`;

const BlogTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const PublishDate = styled.time`
  color: #666;
  font-style: italic;
`;

const CoverImageContainer = styled.div`
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BlogContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    margin: 2rem 0 1rem;
    font-size: 1.8rem;
  }

  h3 {
    margin: 1.5rem 0 1rem;
    font-size: 1.5rem;
  }

  blockquote {
    margin: 2rem 0;
    padding-left: 1.5rem;
    border-left: 4px solid #0066cc;
    font-style: italic;
    color: #555;
  }
`;

const BlogPostTemplate = ({ data }) => {
  const post = data.contentfulBlogPosts
  const coverImage = getImage(post.coverImage)

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />
      <BlogPostContainer>
        <BlogHeader>
          <BlogTitle>{post.title}</BlogTitle>
          <PublishDate>
            {new Date(post.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </PublishDate>
        </BlogHeader>

        <CoverImageContainer>
          <GatsbyImage 
            image={coverImage} 
            alt={post.title}
          />
        </CoverImageContainer>

        <BlogContent
          dangerouslySetInnerHTML={{
            __html: post.content.childMarkdownRemark.html
          }}
        />
      </BlogPostContainer>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostQuery($id: String!) {
    contentfulBlogPosts(id: { eq: $id }) {
      title
      publishDate
      excerpt
      content {
        content
      }
      coverImage {
        gatsbyImageData(
          width: 800
          quality: 85
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }
  }
`

export default BlogPostTemplate
