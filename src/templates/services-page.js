import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

export const ServicesPageTemplate = ({
  title,
  content,
  contentComponent,
  servicesBackground
}) => {
  const PageContent = contentComponent || Content

  const backgroundImageStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  }

  return (
    <div className="services-page">
      <div className="pb0-ns z-1 h5 relative">
        <div className="bg-grey-color-80 absolute cover h-100 w-100 z-2" />
        <Img
          sizes={servicesBackground.childImageSharp.sizes}
          style={backgroundImageStyle}
        />
        <h1 className="mw8 pl5 f2 f-5-ns center white mv0 lh-copy z-5 relative">
          {title}
        </h1>
      </div>
      <PageContent
        className="markdown-content pv5 mw7 center ph4"
        content={content}
      />
    </div>
  )
}

ServicesPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  servicesBackground: PropTypes.object
}

const ServicesPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <Layout>
      <ServicesPageTemplate
        title={page.frontmatter.title}
        content={page.html}
        contentComponent={HTMLContent}
        servicesBackground={page.frontmatter.servicesBackground}
      />
    </Layout>
  )
}

ServicesPage.propTypes = {
  data: PropTypes.object
  //servicesBackground: PropTypes.object
}

export default ServicesPage

export const ServicesPageQuery = graphql`
  query ServicesQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "services-page" } }) {
      html
      frontmatter {
        title
        servicesBackground {
          childImageSharp {
            sizes(maxWidth: 1400) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
