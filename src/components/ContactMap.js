import React from 'react'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'

const ContactMap = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 38.636834, lng: -90.213108 }}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        draggable: false
      }}
    >
      <Marker position={{ lat: 38.636834, lng: -90.213108 }} />
    </GoogleMap>
  ))
)

export default ContactMap
