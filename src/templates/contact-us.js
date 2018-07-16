import PropTypes from 'prop-types'
import React from 'react'
import ContactBox from '../components/Contact'
import Content, { HTMLContent } from '../components/Content'

export const ContactPageTemplate = ({
  title,
  subtitle,
  content,
  contentComponent,
  contactInfo
}) => {
  const PageContent = contentComponent || Content

  return (
    <div className="contact-main">
      <div className="pt3 pb0-ns pb3 bg-blue">
        <h1 className="mw8 pl5 f2 f-5-ns center white mv0 lh-copy">{title}</h1>
        <p className="f3-ns f5 ma0 mw7 center pt2 ph4 ph0-ns pb5-ns white">
          {subtitle}
        </p>
      </div>
      <PageContent
        className="markdown-content pt5 mw7 center ph4"
        content={content}
      />
      {contactInfo && (
        <section className="pb5 mw7 center ph4">
          <ContactBox
            street1={contactInfo.address.street1}
            street2={contactInfo.address.street2}
            city={contactInfo.address.city}
            state={contactInfo.address.state}
            zip={contactInfo.address.zip}
            email={contactInfo.email}
            phone={contactInfo.phone}
          />
        </section>
      )}
    </div>
  )
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  contactInfo: PropTypes.object
}

const ContactPage = ({ data }) => {
  const settingsEdge = data.allMarkdownRemark.edges.find(
    edge => edge.node.frontmatter.templateKey === 'settings'
  )
  const { markdownRemark: page } = data

  return (
    <ContactPageTemplate
      title={page.frontmatter.title}
      subtitle={page.frontmatter.subtitle}
      content={page.html}
      contentComponent={HTMLContent}
      contactInfo={settingsEdge.node.frontmatter}
    />
  )
}

ContactPage.propTypes = {
  data: PropTypes.object
}

export default ContactPage

export const ContactPageQuery = graphql`
  query ContactQueryk {
    ...ContactDetails
    markdownRemark(frontmatter: { templateKey: { eq: "contact-us" } }) {
      html
      frontmatter {
        title
        subtitle
      }
    }
  }
`
