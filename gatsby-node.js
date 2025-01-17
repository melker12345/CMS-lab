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
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        id: node.id,
      },
    })
  })

  // Create pages only for HomePageCards
  const projectResult = await graphql(`
    query {
      allContentfulHomePageCard {
        nodes {
          id
          title
        }
      }
    }
  `)

  projectResult.data.allContentfulHomePageCard.nodes.forEach(node => {
    const slug = node.title.toLowerCase().replace(/\s+/g, '-')
    createPage({
      path: `/project/${slug}`,
      component: path.resolve(`./src/templates/project-template.js`),
      context: {
        id: node.id,
      },
    })
  })
}
