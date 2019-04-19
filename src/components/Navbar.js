import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import logo from '../img/logo.png'

class Navbar extends Component {
  render() {
    const { nav } = this.props

    return (
      <header className="z-4">
        <Helmet>
          <body className={`${this.props.menuOpen ? 'menuOpen' : ''}`} />
        </Helmet>
        <div className="site-header db bg-white">
          <div className="header-wrapper pt3-ns pb3-ns flex justify-between items-center">
            <Link to="/" className="db ml5-ns pb2">
              <img
                src={logo}
                className="db"
                title="ECOcentrix Co logo"
                alt="ECOcentrix Co logo"
              />
            </Link>
            <div className="menu">
              {nav.map((item, i) => (
                <div key={i} className="menu-item">
                  <Link
                    title={item.label}
                    to={item.url}
                    className="underline-hover fw5 ttu tracked"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="sub-menu absolute bg-white pa3">
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          title={child.label}
                          to={child.url}
                          className="db pv2 nowrap underline-hover fw5"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              id="menu-reveal"
              className="menu-button-container right f4 mt3 blue"
              onClick={this.props.onMenuClick}
            >
              Menu&nbsp;
              <i className="fa fa-bars" />
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Navbar.propTypes = {
  nav: PropTypes.array,
  onMenuClick: PropTypes.func,
  menuOpen: PropTypes.bool
}

export default Navbar
