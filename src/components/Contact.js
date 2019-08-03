import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import ContactMap from './SingleLocationMap'

const ContactBox = ({ address, email, phone }) => (
  <div className="flex-ns justify-between">
    <div className="">
      <div className="fw7">ECOcentrix Consultants, LLC</div>
      <div className="fw5">{address.street1}</div>
      {address.street2 && <div className="fw5">{address.street2}</div>}
      <div className="fw5">
        {address.city}, {address.state}. {address.zip}
      </div>
      <div className="pv2">
        <a className="fw7" href={email}>
          {email}
        </a>
      </div>
      <div className="fw5">{phone}</div>
    </div>
    <ContactMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBsuCjHZUuNmjtfjwxYsFGj8aouf18e9aU"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div id="contact-map" className="w-100" />}
      mapElement={<div style={{ height: `100%` }} />}
      lat={38.636834}
      lng={-90.213108}
    />
  </div>
)

ContactBox.propTypes = {
  address: PropTypes.shape({
    street1: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.number
  }),
  email: PropTypes.string,
  phone: PropTypes.string
}

export const ContactBoxQuery = () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "settings" } } }
        ) {
          edges {
            node {
              frontmatter {
                templateKey
                address {
                  street1
                  street2
                  city
                  state
                  zip
                }
                email
                phone
              }
            }
          }
        }
      }
    `}
    render={data => (
      <ContactBox {...data.allMarkdownRemark.edges[0].node.frontmatter} />
    )}
  />
)

export default ContactBoxQuery
