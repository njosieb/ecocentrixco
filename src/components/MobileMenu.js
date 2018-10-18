import PropTypes from 'prop-types'
import React from 'react'

const MobileMenu = ({ nav }) => (
  <nav
    id="main-menu"
    className="right nav-menu h-100"
    onClick={e => e.stopPropagation()}
  >
    <div className="menu-section pt3">
      {nav.map((item, i) => (
        <a
          key={i}
          title={item.label}
          href={item.url}
          className="mobile-menu-link fw7"
        >
          <div className="menu-item underline-hover tr hover-white pointer">
            {item.label}
          </div>
        </a>
      ))}
    </div>
  </nav>
)

MobileMenu.propTypes = {
  nav: PropTypes.array
}

export default MobileMenu
