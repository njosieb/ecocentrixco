import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

export const CertificationsPageTemplate = ({
  title,
  content,
  contentComponent,
  certificationBackground
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
    <div className="certifications-main">
      <div className="pb0-ns relative z-1 h5">
        <div className="bg-gold-80 absolute cover h-100 w-100 z-5" />

        <Img
          sizes={certificationBackground.childImageSharp.sizes}
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

CertificationsPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  certificationBackground: PropTypes.object
}

const CertificationsPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <Layout>
      <CertificationsPageTemplate
        title={page.frontmatter.title}
        content={page.html}
        contentComponent={HTMLContent}
        certificationBackground={page.frontmatter.certificationBackground}
      />
    </Layout>
  )
}

CertificationsPage.propTypes = {
  data: PropTypes.object,
  certificationBackground: PropTypes.object
}

export default CertificationsPage

export const CertificationsPageQuery = graphql`
  query CertificationsQuery {
    markdownRemark(
      frontmatter: { templateKey: { eq: "certifications-page" } }
    ) {
      html
      frontmatter {
        title
        certificationBackground {
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
