import PropTypes from 'prop-types'
import React from 'react'
import logo from '../img/logo.png'

const Navbar = ({ nav }) => (
  <header className="z-2">
    <div className="site-header db bg-white">
      <div className="header-wrapper pt3-ns pb3-ns flex justify-between items-center">
        <a href="/" className="db ml4-ns">
          <img src={logo} className="ph3 pv2" />
        </a>
        <div className="menu">
          {nav.map((item, i) => (
            <div key={i} className="menu-item">
              <a
                title={item.label}
                href={item.url}
                className="underline-hover fw7"
              >
                {item.label}
              </a>
              {item.children && (
                <div className="sub-menu absolute bg-black-80 pa2">
                  {item.children.map((child, j) => (
                    <a
                      key={j}
                      title={child.label}
                      href={child.url}
                      className="db pv2 white nowrap hover-gold"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          id="menu-reveal"
          className="menu-button-container right f4 mt3 blue"
        >
          Menu&nbsp;
          <i className="fa fa-bars" />
        </div>
      </div>
    </div>
  </header>
)

Navbar.propTypes = {
  nav: PropTypes.array
}

export default Navbar
