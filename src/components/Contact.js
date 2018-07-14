import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Helmet from 'react-helmet'

class ContactBox extends Component {
  setGoogleMapOnLoad = function({ scriptTags }) {
    if (scriptTags) {
      const googleMapScript = scriptTags[0]
      googleMapScript.onload = this.initContactLocation
    }
  }

  initContactLocation = function() {
    const map = new window.google.maps.Map(
      document.getElementById('contact-map'),
      {
        zoom: 12,
        center: { lat: 38.636834, lng: -90.213108 },
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        draggable: false
      }
    )

    new window.google.maps.Marker({
      position: { lat: 38.636834, lng: -90.213108 },
      map: map
    })
  }

  render() {
    const { street1, street2, city, state, zip, email, phone } = this.props
    return (
      <div className="flex-ns justify-between">
        <Helmet
          script={[
            {
              src:
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyBsuCjHZUuNmjtfjwxYsFGj8aouf18e9aU',
              async: true,
              defer: true
            }
          ]}
          onChangeClientState={(newState, addedTags) =>
            this.setGoogleMapOnLoad(addedTags)
          }
        />
        <div className="">
          <div className="fw7">ECOcentrix Consultants, LLC</div>
          <div className="fw5">{street1}</div>
          {street2 && <div className="fw5">{street2}</div>}
          <div className="fw5">
            {city}, {state}. {zip}
          </div>
          <div className="pv2">
            <a className="fw7" href={email}>
              {email}
            </a>
          </div>
          <div className="fw5">{phone}</div>
        </div>
        <div id="contact-map" className="w-100" />
      </div>
    )
  }
}

ContactBox.propTypes = {
  street1: PropTypes.string,
  street2: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.number,
  email: PropTypes.string,
  phone: PropTypes.string
}

export default ContactBox

export const contactBoxQuery = graphql`
  fragment ContactDetails on RootQueryType {
    allMarkdownRemark {
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
`