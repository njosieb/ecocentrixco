import React from 'react'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'

const ContactMap = withScriptjs(
  withGoogleMap(({ lat, lng }) => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat, lng }}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        draggable: false
      }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  ))
)

export default ContactMap
