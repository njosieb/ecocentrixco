import PropTypes from 'prop-types'
import React from 'react'

const MobileMenu = ({ nav }) => (
  <nav id="main-menu" className="right nav-menu">
    <div className="menu-section pt3">
      {nav.map((item, i) => (
        <div
          key={i}
          className="menu-item underline-hover tr hover-white pointer"
        >
          <a
            title={item.label}
            href={item.url}
            className="mobile-menu-link fw7"
          >
            {item.label}
          </a>
        </div>
      ))}
    </div>
  </nav>
)

MobileMenu.propTypes = {
  nav: PropTypes.array
}

export default MobileMenu
