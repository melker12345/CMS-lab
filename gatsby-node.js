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

  const result = await graphql(`
    query {
      allContentfulProject {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const projects = result.data.allContentfulProject.nodes

  projects.forEach(project => {
    createPage({
      path: `/project/${project.slug}`,
      component: path.resolve("./src/templates/project.js"),
      context: {
        slug: project.slug,
      },
    })
  })
}
