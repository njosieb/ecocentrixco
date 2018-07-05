import PropTypes from 'prop-types'
import React from 'react'
import Content, { HTMLContent } from '../components/Content'

const CertificationsPageTemplate = ({
  title,
  subtitle,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
    <div className="certifications-main">
      <div className="pt3 bg-blue">
        <h1 className="mw8 ph4 f1 f-5-ns center white mv0 lh-copy">{title}</h1>
        <p className="f3 ma0 mw7 center pt2 ph4 ph0-ns pb5-ns white">
          {subtitle}
        </p>
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
  subtitle: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func
}

const CertificationsPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <CertificationsPageTemplate
      title={page.frontmatter.title}
      subtitle={page.frontmatter.subtitle}
      content={page.html}
      contentComponent={HTMLContent}
    />
  )
}

CertificationsPage.propTypes = {
  data: PropTypes.object
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
        subtitle
      }
    }
  }
`
