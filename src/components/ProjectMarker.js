import React from 'react'
import { InfoWindow, Marker } from 'react-google-maps'

const ProjectMarker = ({ project, windowOpen, toggleWindow }) => (
  <Marker position={project.position} onClick={() => toggleWindow(project.id)}>
    {windowOpen && (
      <InfoWindow onCloseClick={() => toggleWindow(project.id)}>
        <div className="marker-info-window">
          {project.picture && (
            <div className="marker-picture">
              <img alt={project.title} src={project.picture} />
            </div>
          )}
          <div className="marker-body">
            <h4 className="marker-title">{project.title}</h4>
            <p className="marker-description">{project.description || ''}</p>
          </div>
        </div>
      </InfoWindow>
    )}
  </Marker>
)

export default ProjectMarker
