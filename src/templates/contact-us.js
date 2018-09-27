import PropTypes from 'prop-types'
import React from 'react'
import ContactBox from '../components/Contact'
import Content, { HTMLContent } from '../components/Content'
import Img from 'gatsby-image'

export const ContactPageTemplate = ({
  title,
  content,
  contentComponent,
  contactInfo,
  contactBackground
}) => {
  const PageContent = contentComponent || Content
  const backgroundImageStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%'
  }

  return (
    <div className="contact-main">
      <div className="pb0-ns z-1 h5 relative">
        <div className="bg-grey-color-80 absolute cover h-100 w-100 z-2" />
        <Img
          sizes={contactBackground.childImageSharp.sizes}
          style={backgroundImageStyle}
        />
        <h1 className="mw8 pl5 f2 f-5-ns center white mv0 lh-copy z-5">
          {title}
        </h1>
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
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  contactInfo: PropTypes.object,
  contactBackground: PropTypes.object
}

const ContactPage = ({ data }) => {
  const settingsEdge = data.allMarkdownRemark.edges.find(
    edge => edge.node.frontmatter.templateKey === 'settings'
  )
  const { markdownRemark: page } = data

  return (
    <ContactPageTemplate
      title={page.frontmatter.title}
      content={page.html}
      contentComponent={HTMLContent}
      contactInfo={settingsEdge.node.frontmatter}
      contactBackground={page.frontmatter.contactBackground}
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
        contactBackground {
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
