/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Navigation from "./navigation"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Navigation />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1200,
          padding: `2rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `4rem`,
            textAlign: `center`,
            padding: `2rem`,
            borderTop: `1px solid #eee`,
          }}
        >
          {new Date().getFullYear()} {data.site.siteMetadata?.title}. All rights reserved.
        </footer>
      </div>
    </>
  )
}

export default Layout
