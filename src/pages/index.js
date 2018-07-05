import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ContactBox from '../components/Contact';
import windmillMp4 from '../videos/windmill.mp4';
import windmillWebm from '../videos/windmill.webm';

export class IndexPageTemplate extends Component {
  render() {
    const { certifications, contactInfo } = this.props
    const { address, email, phone } = contactInfo
    return (
      <main className="home-main">
        <section id="home-hero" className="relative overflow-hidden">
          <div className="video-wrapper h-100">
            <video
              preload="true"
              loop="true"
              muted="true"
              autoPlay="true"
              webkit-playsinline="true"
              playsInline="true"
              poster="/img/windmill_still.jpg"
              className="bg-video db mw-100 w-100 h-100"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            >
              <source src={windmillWebm} type="video/webm" />
              <source src={windmillMp4} type="video/mp4" />
            </video>
          </div>
          <div className="top-content absolute top-0 w-100 pt5 h-100 flex flex-column">
            <div className="mb4 pt3 ph4 relative flex-auto">
              <p className="f3 f2-ns white fw7 text-outline">
                Energy auditors and consultants
                <br />
                for residential and commercial spaces
              </p>
              <p className="f4 f3-ns white fw7 text-outline">
                Need an audit? Want to save money and be green?
              </p>
            </div>
            <a
              href="/services"
              className="db bg-blue white pa2 f4 tc f3-ns mw6 center hover-white hover-shadow fw7 mb4"
            >
              Check Out The Work We Do
            </a>
          </div>
        </section>
        <section id="work" className="relative pt6 ph3">
          <div className="mw8 center flex-ns justify-around">
            <div className="work-type flex-50 mb4">
              <div className="tc mr3-ns">
                <i className="fa fa-check-square-o f-6 dib green" />
                <h3 className="f2 green">Energy Auditing</h3>
                <p className="f4">
                  Invite us to visit your existing buildings to identify{' '}
                  <b className="blue">energy saving opportunities</b>,
                  conducting specialized and nationally recognized energy audits
                </p>
                <a
                  href="/about#auditing"
                  className="db bg-blue white pa2 f4 hover-white hover-shadow fw7 mv4 hover-gold"
                >
                  Learn About
                  <br />
                  Energy Auditing
                </a>
                <a
                  href="/services"
                  className="db bg-blue white pa2 f4 hover-white hover-shadow fw7 hover-gold"
                >
                  View Our Auditing Projects
                </a>
              </div>
            </div>
            <div className="work-type flex-50 mb4">
              <div className="tc mh1-ns">
                <i className="fa fa-handshake-o f-6 dib green" />
                <h3 className="f2 green">Energy Consulting</h3>
                <p className="f4">
                  Bring us on early in your project to work side-by-side with
                  your architects and implement{' '}
                  <b className="blue">sustainable enery solutions</b> within
                  your budget
                </p>
                <a
                  href="/about#consulting"
                  className="db bg-blue white pa2 f4 hover-white hover-shadow fw7 mv4 hover-gold"
                >
                  Learn About
                  <br />
                  Energy Consulting
                </a>
                <a
                  href="/services"
                  className="db bg-blue white pa2 f4 hover-white hover-shadow fw7 hover-gold"
                >
                  View Our Consulting Projects
                </a>
              </div>
            </div>
            <div className="work-type flex-50">
              <div className="tc ml3-ns">
                <i className="fa fa-dashboard f-6 dib green" />
                <h3 className="f2 green">Radon Testing</h3>
                <p className="f4">
                  Buying a home or need to evaluate an older property? We can{' '}
                  <b className="blue">measure radon levels</b> and give you
                  solutions for keeping your basements free of radon
                </p>
                <a
                  href="/about#radon"
                  className="db bg-blue white pa2 f4 hover-white hover-shadow fw7 mv4 hover-gold"
                >
                  Learn About
                  <br />
                  Radon Testing
                </a>
                <a
                  href="/services"
                  className="db bg-blue white pa2 f4 hover-white hover-shadow fw7 hover-gold"
                >
                  View Our Radon Projects
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="stats" className="relative pv4 pv6-ns mt4 ph3 bg-blue">
          <div className="mw8 center">
            <div className="flex-ns flex-wrap justify-between-ns justify-center fw7">
              <div className="stat mh5-ns tc flex-0 center">
                <div className="f-6-ns f-5 white">3,600</div>
                <div className="f3 gold">Units</div>
              </div>
              <div className="stat mh5-ns center tc flex-0">
                <div className="f-6-ns f-5 white">60+</div>
                <div className="f3 gold">Projects</div>
              </div>
              <div className="stat mh5-ns center tc flex-0">
                <div className="f-6-ns f-5 white">9</div>
                <div className="f3 gold">States</div>
              </div>
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
  certifications: PropTypes.array,
  contactInfo: PropTypes.object
}

const IndexPage = ({ data }) => {
  const { certifications } = data.markdownRemark.frontmatter
  const settingsEdge = data.allMarkdownRemark.edges.find(
    edge => edge.node.frontmatter.templateKey === 'settings'
  )

  return (
    <IndexPageTemplate
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
