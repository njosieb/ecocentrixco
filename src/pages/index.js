import Img from 'gatsby-image'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ContactBox from '../components/Contact'

export class IndexPageTemplate extends Component {
  backgroundImageStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  }

  render() {
    const {
      headerImage,
      headerText,
      headerSubtext,
      servicesList,
      statsBackground,
      statsList,
      certifications,
      contactInfo,
      servicesHeader,
      whoList,
      whoHeader
    } = this.props

    return (
      <main className="home-main">
        <section id="home-hero" className="relative z-1">
          <div className="bg-grey-color-80 absolute cover h-100 w-100 z-2" />
          {headerImage.childImageSharp && (
            <Img
              sizes={headerImage.childImageSharp.sizes}
              style={this.backgroundImageStyle}
              imgStyle={{ objectPosition: 'top' }}
            />
          )}
          <div className="top-content relative w-100 tc tl-ns pt6-ns pb5-ns pb2 h-100 flex flex-column z-3">
            <div className="mb6-ns mb4 pb4-ns pt3 ph1 ph5-ns relative flex-auto center mw7">
              <p className="f4 f2-ns white fw7 tc">{headerText}</p>
              <p className="f4 f3-ns white fw7">{headerSubtext}</p>
            </div>
            <Link
              to="/services"
              className="db bg-blue white pv2 ph4 f4 tc f3-ns mw6 center hover-gold hover-shadow fw7"
            >
              Check Out The Work We Do
            </Link>
          </div>
        </section>
        <section id="work" className="relative pt4 pb4 ph3">
          <h1 className="blue pa1 mb0 pt0 tc">{servicesHeader}</h1>
          <div className="work-types mw8-l mw6 center items-stretch justify-around pb4">
            {servicesList.map((service, i) => (
              <Link
                to={service.serviceLink}
                className="work-type db mh5 mv4 tc hover-shadow"
                key={i}
              >
                <div className="h-100">
                  <div className="bg-gold-80 absolute cover h-100 w-100 z-3" />
                  <Img
                    sizes={service.background.childImageSharp.sizes}
                    style={this.backgroundImageStyle}
                  />
                  <div className="pa3 relative">
                    <i
                      className={`fa ${
                        service.icon
                      } f-6 dib white z-3 relative`}
                    />
                    <h3 className="f2 mb0 white nowrap z-3 relative">
                      {service.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section id="stats" className="relative pv4 pv6-ns mt4 ph3 z-1">
          <div className="bg-gold-80 absolute cover h-100 w-100 z-2 top-0 left-0" />
          {statsBackground.childImageSharp && (
            <Img
              sizes={statsBackground.childImageSharp.sizes}
              style={this.backgroundImageStyle}
            />
          )}
          <div className="mw8 center z-3 relative">
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

        <section id="work" className="relative pt4 pb4 ph3">
          <h1 className="green pa1 mb0 pt0 tc">{whoHeader}</h1>
          <div className="work-types mw8-l mw6 center items-stretch justify-around pb4">
            {whoList.map((client, i) => (
              <Link
                to={client.whoLink}
                className="work-type db mh5 mv4 tc hover-shadow"
                key={i}
              >
                <div className="h-100 relative z-1">
                  <div
                    className={
                      'bg-grey-color-80 absolute cover h-100 w-100 z-3'
                    }
                  />
                  <Img
                    sizes={client.background.childImageSharp.sizes}
                    style={this.backgroundImageStyle}
                  />
                  <div className="pa3 relative">
                    <i
                      className={`fa fa-beer f-6 dib transparent z-2 relative`}
                    />
                    <h3 className="f2 mb0 white nowrap z-3 relative">
                      {client.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="certifications" className="relative pt5 ph3">
          <div className="mw7 center">
            <h1 className="f2 f1-ns white bg-blue tc">Certifications</h1>

            <div className="flex flex-wrap justify-center items-center pt0">
              {certifications.map((cert, i) => (
                <Link
                  to={`/certifications#${cert.certId}`}
                  key={i}
                  className="image-container flex items-center justify-center"
                >
                  <Img
                    className="db center mb4"
                    resolutions={cert.certImage.childImageSharp.resolutions}
                    fadeIn={true}
                    alt={cert.description}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
        {contactInfo && (
          <section id="contact" className="relative pb5 ph3">
            <div className="mw7 center">
              <h1 className="f2 f1-ns white bg-green tc">Contact Us</h1>
              <ContactBox
                street1={contactInfo.address.street1}
                street2={contactInfo.address.street2}
                city={contactInfo.address.city}
                state={contactInfo.address.state}
                zip={contactInfo.address.zip}
                email={contactInfo.email}
                phone={contactInfo.phone}
              />
            </div>
          </section>
        )}
      </main>
    )
  }
}

IndexPageTemplate.propTypes = {
  headerImage: PropTypes.object,
  headerText: PropTypes.string,
  headerSubtext: PropTypes.string,
  servicesList: PropTypes.array,
  statsBackground: PropTypes.object,
  statsList: PropTypes.array,
  certifications: PropTypes.array,
  contactInfo: PropTypes.object,
  servicesHeader: PropTypes.string,
  whoList: PropTypes.array,
  whoHeader: PropTypes.string
}

const IndexPage = ({ data }) => {
  const {
    certifications,
    headerImage,
    headerText,
    headerSubtext,
    servicesList,
    statsBackground,
    statsList,
    servicesHeader,
    whoList,
    whoHeader
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
      statsBackground={statsBackground}
      statsList={statsList}
      certifications={certifications}
      contactInfo={settingsEdge.node.frontmatter}
      servicesHeader={servicesHeader}
      whoList={whoList}
      whoHeader={whoHeader}
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
        servicesHeader
        servicesList {
          icon
          name
          serviceLink
          background {
            childImageSharp {
              sizes(maxWidth: 300) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        statsBackground {
          childImageSharp {
            sizes(maxWidth: 1400) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        statsList {
          statNum
          label
        }
        whoHeader
        whoList {
          name
          whoLink
          background {
            childImageSharp {
              sizes(maxWidth: 300) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        certifications {
          certImage {
            childImageSharp {
              resolutions(width: 200) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
          description
          certId
        }
      }
    }
  }
`
