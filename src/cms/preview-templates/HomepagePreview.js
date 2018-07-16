import PropTypes from 'prop-types'
import React from 'react'
import { IndexPageTemplate } from '../../pages/index'

const HomepagePreview = ({ entry }) => (
  <IndexPageTemplate
    headerImage={entry.getIn(['data', 'headerImage'])}
    headerText={entry.getIn(['data', 'headerText'])}
    headerSubtext={entry.getIn(['data', 'headerSubtext'])}
    servicesList={entry.getIn(['data', 'servicesList'])}
    statsList={entry.getIn(['data', 'statsList'])}
    certifications={entry.getIn(['data', 'certifications'])}
  />
)

HomepagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
}

export default HomepagePreview
