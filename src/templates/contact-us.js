import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'
import ContactBox from '../components/Contact'
import Content, { HTMLContent } from '../components/Content'

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
        <h1 className="mw8 pl5 f2 f-5-ns center white mv0 lh-copy z-5 relative">
          {title}
        </h1>
      </div>
      <section className="contact-form markdown-content pt5 mw7 center ph4">
        <h3>Tell Us About Your Project!</h3>
        <p className="f6">
          If you'd like us to reach out to you, give us an idea of your current
          project. <br />
          We'll reach out to you using the email you provide us below.
        </p>
        <form
          name="contact-us-form"
          data-netlify="true"
          method="post"
          action="/contact-us/success"
        >
          <p>
            <label>
              Your Name:{' '}
              <input
                type="text"
                name="name"
                placeholder="John Smith"
                required
              />
            </label>
          </p>
          <p>
            <label>
              Your Email:{' '}
              <input
                type="email"
                name="email"
                placeholder="JSmith@contactme.com"
                required
              />
            </label>
          </p>
          <p>
            <label>Project Description:</label>
            <textarea
              name="message"
              className="w-100 pa2"
              rows="4"
              placeholder="What services are you looking for? How big is your project? When is your project starting?"
            />
          </p>
          <p>
            <input type="hidden" name="form-name" value="contact-us-form" />
            <button
              className="f5 no-underline br-pill pointer b--none ph3 pv2 mb2 dib white bg-blue"
              type="submit"
            >
              Send
            </button>
          </p>
        </form>
      </section>
      <PageContent
        className="markdown-content pt4 mw7 center ph4"
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
