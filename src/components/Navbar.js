import GatsbyLink from 'gatsby-link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import logo from '../img/logo.png';

class Navbar extends Component {
  state = {
    menuOpen: false
  }

  toggleMenu = function() {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render() {
    const { nav } = this.props

    return (
      <header className="z-4">
        <Helmet>
          <body className={`${this.state.menuOpen ? 'menuOpen' : ''}`} />
        </Helmet>
        <div className="site-header db bg-white">
          <div className="header-wrapper pt3-ns pb3-ns flex justify-between items-center">
            <GatsbyLink to="/" className="db ml5-ns pb2">
              <img
                src={logo}
                className="db"
                title="ECOcentrix Co logo"
                alt="ECOcentrix Co logo"
              />
            </GatsbyLink>
            <div className="menu">
              {nav.map((item, i) => (
                <div key={i} className="menu-item">
                  <GatsbyLink
                    title={item.label}
                    to={item.url}
                    className="underline-hover fw5 ttu tracked"
                  >
                    {item.label}
                  </GatsbyLink>
                  {item.children && (
                    <div className="sub-menu absolute bg-white pa3">
                      {item.children.map((child, j) => (
                        <GatsbyLink
                          key={j}
                          title={child.label}
                          to={child.url}
                          className="db pv2 nowrap underline-hover fw5"
                        >
                          {child.label}
                        </GatsbyLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              id="menu-reveal"
              className="menu-button-container right f4 mt3 blue"
              onClick={() => this.toggleMenu()}
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
  nav: PropTypes.array
}

export default Navbar
