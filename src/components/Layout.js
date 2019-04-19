import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import './all.scss'
import Footer from './Footer'
import MobileMenu from './MobileMenu'
import Navbar from './Navbar'

class Layout extends Component {
  state = {
    menuOpen: false
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  clickOut = () => {
    if (this.state.menuOpen) {
      this.setState({
        menuOpen: false
      })
    }
  }

  render() {
    const { data, children } = this.props
    const settingsEdges = data.allMarkdownRemark.edges.filter(
      edge => edge.node.frontmatter.templateKey === 'settings'
    )
    const nav = settingsEdges.filter(edge => !!edge.node.frontmatter.nav)[0]
      .node.frontmatter.nav
    const socialMediaLinks = settingsEdges.filter(
      edge => !!edge.node.frontmatter.socialMediaLinks
    )[0].node.frontmatter.socialMediaLinks

    return (
      <div onClick={this.clickOut} className="main-container">
        <Helmet title="ECOCentrix Co." />
        <Navbar
          nav={nav}
          menuOpen={this.state.menuOpen}
          onMenuClick={this.toggleMenu}
        />
        <MobileMenu nav={nav} />
        {children}
        <Footer socialMediaLinks={socialMediaLinks} />
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  data: PropTypes.object
}

const LayoutQuery = props => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                templateKey
                nav {
                  label
                  url
                  children {
                    label
                    url
                  }
                }
                socialMediaLinks {
                  icon
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
)

export default LayoutQuery
