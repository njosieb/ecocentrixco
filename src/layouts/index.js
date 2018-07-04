import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.scss'

const TemplateWrapper = ({ children, data }) => {
  const { nav } = data.markdownRemark.frontmatter
  return (
    <div className="main-container">
      <Helmet title="ECOCentrix Co." />
      <Navbar nav={nav} />
      {children()}
      <Footer />
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
    markdownRemark(frontmatter: { templateKey: { eq: "settings" } }) {
      frontmatter {
        nav {
          label
          url
          children {
            label
            url
          }
        }
      }
    }
  }
`
