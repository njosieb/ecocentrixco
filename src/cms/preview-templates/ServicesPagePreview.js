import PropTypes from 'prop-types'
import React from 'react'
import { ServicesPageTemplate } from '../../templates/services-page'

const ServicesPagePreview = ({ entry }) => (
  <ServicesPageTemplate
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    projects={entry.getIn(['data', 'projects'])}
  />
)

ServicesPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
}

export default ServicesPagePreview
