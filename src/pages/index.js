import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ContactBox from '../components/Contact'

export class IndexPageTemplate extends Component {
  render() {
    const {
      headerImage,
      headerText,
      headerSubtext,
      servicesList,
      statsList,
      certifications,
      contactInfo
    } = this.props
    const { address, email, phone } = contactInfo
    return (
      <main className="home-main">
        <section id="home-hero" className="relative overflow-hidden">
          <div className="h-100 relative z-1">
            <div className="bg-grey-60 absolute cover h-100 w-100 z-2" />
            <Img
              sizes={headerImage.childImageSharp.sizes}
              className="bg-video db mw-100 w-100 h-100"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <div className="top-content absolute top-0 w-100 pt5 h-100 flex flex-column z-3">
            <div className="mb4 pt3 pl5 relative flex-auto mw7">
              <p className="f3 f2-ns white fw7">{headerText}</p>
              <p className="f4 f3-ns white fw7">{headerSubtext}</p>
            </div>
            <a
              href="/services"
              className="db bg-blue white pv2 ph3 f4 tc f3-ns mw6 center hover-white hover-shadow fw7 mb5"
            >
              Check Out The Work We Do
            </a>
          </div>
        </section>
        <section id="work" className="relative pt6 ph3">
          <div className="mw8 center flex-ns items-stretch justify-around">
            {servicesList.map((service, i) => (
              <div
                className="work-type flex flex-column flex-50 mb4 tc mr3-ns"
                key={i}
              >
                <div className="h-100">
                  <i className={`fa ${service.icon} f-6 dib green`} />
                  <h3 className="f2 green nowrap">{service.name}</h3>
                  <p className="f4">{service.description}</p>
                </div>
                <a
                  href={service.buttonLink}
                  className="db bg-blue white pa2 nowrap f4 hover-white hover-shadow fw7 mv4 hover-gold"
                >
                  {service.buttonText}
                </a>
              </div>
            ))}
          </div>
        </section>
        <section id="stats" className="relative pv4 pv6-ns mt4 ph3 bg-blue">
          <div className="mw8 center">
            <div className="flex-ns flex-wrap justify-between-ns justify-center fw7">
              {statsList.map((stat, i) => (
                <div className="stat mh5-ns tc flex-0 center" key={i}>
                  <div className="f-6-ns f-5 white">{stat.statNum}</div>
                  <div className="f3 gold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="certifications" className="relative pt5 ph3">
          <div className="mw7 center">
            <h2 className="f2 f1-ns green tc">Certifications</h2>
            <p>
              We have the expertise and the certifcations to back it up. Don't
              trust anyone else with your project who isn't qualified as we are
            </p>
            <div className="flex flex-wrap justify-center items-center">
              {certifications.map((cert, i) => (
                <div key={i} className="image-container mh3">
                  <Img
                    className="db center mb4"
                    resolutions={cert.certImage.childImageSharp.resolutions}
                    fadeIn={true}
                    alt={cert.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="relative pb5 ph3">
          <div className="mw7 center">
            <h3 className="f2 f1-ns green tc">Contact Us</h3>
            <ContactBox
              street1={address.street1}
              street2={address.street2}
              city={address.city}
              state={address.state}
              zip={address.zip}
              email={email}
              phone={phone}
            />
          </div>
        </section>
      </main>
    )
  }
}

IndexPageTemplate.propTypes = {
  headerImage: PropTypes.object,
  headerText: PropTypes.string,
  headerSubtext: PropTypes.string,
  servicesList: PropTypes.array,
  statsList: PropTypes.array,
  certifications: PropTypes.array,
  contactInfo: PropTypes.object
}

const IndexPage = ({ data }) => {
  const {
    certifications,
    headerImage,
    headerText,
    headerSubtext,
    servicesList,
    statsList
  } = data.markdownRemark.frontmatter
  const settingsEdge = data.allMarkdownRemark.edges.find(
    edge => edge.node.frontmatter.templateKey === 'settings'
  )

  return (
    <IndexPageTemplate
      headerImage={headerImage}
      headerText={headerText}
      headerSubtext={headerSubtext}
      servicesList={servicesList}
      statsList={statsList}
      certifications={certifications}
      contactInfo={settingsEdge.node.frontmatter}
    />
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
}

export default IndexPage

export const indexPageQuery = graphql`
  query IndexPage {
    ...ContactDetails
    markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
      frontmatter {
        headerImage {
          childImageSharp {
            sizes(maxWidth: 1400) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        headerText
        headerSubtext
        servicesList {
          icon
          name
          description
          buttonText
          buttonLink
        }
        statsList {
          statNum
          label
        }
        certifications {
          certImage {
            childImageSharp {
              resolutions(width: 300) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
          description
        }
      }
    }
  }
`
