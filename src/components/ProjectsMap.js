import React from 'react'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'
import ProjectMarker from './ProjectMarker'

const ProjectsMap = withScriptjs(
  withGoogleMap(({ markers, markerStates, toggleMarkerWindow }) => (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{ lat: 38.628141, lng: -90.209818 }}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        draggable: true
      }}
    >
      {markers.map(marker => (
        <ProjectMarker
          key={marker.id}
          windowOpen={markerStates[marker.id]}
          toggleWindow={toggleMarkerWindow}
          project={marker}
        />
      ))}
    </GoogleMap>
  ))
)

export default ProjectsMap
