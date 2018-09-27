import PropTypes from 'prop-types'
import React from 'react'
import Content, { HTMLContent } from '../components/Content'
import Img from 'gatsby-image'

export const AboutPageTemplate = ({
  title,
  content,
  contentComponent,
  aboutUsBackground
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
    <div className="about-main">
      <div className="pb0-ns z-1 h5 relative">
        <div className="bg-grey-color-80 absolute cover h-100 w-100 z-2" />
        <Img
          sizes={aboutUsBackground.childImageSharp.sizes}
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

AboutPageTemplate.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  aboutUsBackground: PropTypes.object
}

const AboutPage = ({ data }) => {
  const { markdownRemark: page } = data

  return (
    <AboutPageTemplate
      title={page.frontmatter.title}
      content={page.html}
      contentComponent={HTMLContent}
      aboutUsBackground={page.frontmatter.aboutUsBackground}
    />
  )
}

AboutPage.propTypes = {
  data: PropTypes.object,
  aboutUsBackground: PropTypes.object
}

export default AboutPage

export const AboutPageQuery = graphql`
  query AboutQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      html
      frontmatter {
        title
        aboutUsBackground {
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
