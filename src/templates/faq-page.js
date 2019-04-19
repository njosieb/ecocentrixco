import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

export const FaqPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <div className="faq-main">
      <div className="pt3 pb0-ns pb3 bg-blue">
        <h1 className="mw8 pl5 f2 f-5-ns center white mv0 lh-copy">{title}</h1>
      </div>
      <PageContent
        className="markdown-content pv5 mw7 center ph4"
        content={content}
      />
    </div>
  )
}

FaqPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func
}

const FaqPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <Layout>
      <FaqPageTemplate
        title={page.frontmatter.title}
        content={page.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

FaqPage.propTypes = {
  data: PropTypes.object
}

export default FaqPage

export const FaqPageQuery = graphql`
  query FaqQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "faq-page" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
