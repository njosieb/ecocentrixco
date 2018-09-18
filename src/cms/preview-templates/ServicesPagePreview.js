import PropTypes from 'prop-types'
import React from 'react'
import { ProjectsPageTemplate } from '../../templates/projects-page'

const ProjectsPagePreview = ({ entry }) => (
  <ProjectsPageTemplate
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    projects={entry.getIn(['data', 'projects'])}
  />
)

ProjectsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
}

export default ProjectsPagePreview
