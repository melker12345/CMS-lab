import * as React from "react"
import { Link } from "gatsby"

const Navigation = () => {
  return (
    <nav
      style={{
        background: `var(--color-primary)`,
        padding: `1rem`,
        marginBottom: `1.5rem`,
      }}
    >
      <ul
        style={{
          listStyle: `none`,
          display: `flex`,
          justifyContent: `center`,
          margin: 0,
          padding: 0,
          gap: `2rem`,
        }}
      >
        <li>
          <Link to="/" style={{ color: `white`, textDecoration: `none` }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/projects" style={{ color: `white`, textDecoration: `none` }}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="/about" style={{ color: `white`, textDecoration: `none` }}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" style={{ color: `white`, textDecoration: `none` }}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
