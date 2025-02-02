/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require("path")

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Create blog post pages
  const blogResult = await graphql(`
    query {
      allContentfulBlogPosts {
        nodes {
          id
        }
      }
    }
  `)

  blogResult.data.allContentfulBlogPosts.nodes.forEach(node => {
    createPage({
      path: `/blog/${node.id}`,
      component: path.resolve(`./src/templates/blog-post-template.js`),
      context: {
        id: node.id,
      },
    })
  })

  // Create pages for HomePageCards using id
  const projectResult = await graphql(`
    query {
      allContentfulHomePageCard {
        nodes {
          id
        }
      }
    }
  `)

  projectResult.data.allContentfulHomePageCard.nodes.forEach(node => {
    createPage({
      path: `/project/${node.id}`,
      component: path.resolve(`./src/templates/project.js`),
      context: {
        id: node.id,
      },
    })
  })
}
