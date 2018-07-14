import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import MobileMenu from '../components/MobileMenu'
import Navbar from '../components/Navbar'
import './all.scss'

const TemplateWrapper = ({ children, data }) => {
  const settingsEdges = data.allMarkdownRemark.edges.filter(
    edge => edge.node.frontmatter.templateKey === 'settings'
  )
  const nav = settingsEdges.filter(edge => !!edge.node.frontmatter.nav)[0].node
    .frontmatter.nav
  const socialMediaLinks = settingsEdges.filter(
    edge => !!edge.node.frontmatter.socialMediaLinks
  )[0].node.frontmatter.socialMediaLinks

  return (
    <div className="main-container">
      <Helmet title="ECOCentrix Co." />
      <Navbar nav={nav} />
      <MobileMenu nav={nav} />
      {children()}
      <Footer socialMediaLinks={socialMediaLinks} />
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
}

export default TemplateWrapper

export const LayoutQuery = graphql`
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
`
