import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const MobileMenu = ({ nav }) => (
  <nav
    id="main-menu"
    className="right nav-menu h-100"
    onClick={e => e.stopPropagation()}
  >
    <div className="menu-section pt4">
      {nav.map((item, i) => (
        <Link
          key={i}
          title={item.label}
          to={item.url}
          className="mobile-menu-link fw7"
        >
          <div className="menu-item underline-hover tr hover-white pointer">
            {item.label}
          </div>
        </Link>
      ))}
    </div>
  </nav>
)

MobileMenu.propTypes = {
  nav: PropTypes.array
}

export default MobileMenu
