import PropTypes from 'prop-types'
import React from 'react'
import Content, { HTMLContent } from '../components/Content'

export const ServicesPageTemplate = ({
  title,
  subtitle,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
    <div className="faq-main">
      <div className="pt3 pb0-ns pb3 bg-blue">
        <h1 className="mw8 pl5 f2 f-5-ns center white mv0 lh-copy">{title}</h1>
        <p className="f3-ns f5 ma0 mw7 center pt2 ph4 ph0-ns pb5-ns white">
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

ServicesPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func
}

const ServicesPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <ServicesPageTemplate
      title={page.frontmatter.title}
      subtitle={page.frontmatter.subtitle}
      content={page.html}
      contentComponent={HTMLContent}
    />
  )
}

ServicesPage.propTypes = {
  data: PropTypes.object
}

export default ServicesPage

export const ServicesPageQuery = graphql`
  query ServicesQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "services-page" } }) {
      html
      frontmatter {
        title
        subtitle
      }
    }
  }
`
