import PropTypes from 'prop-types'
import React from 'react'
import { HTMLContent } from '../../components/Content'
import { CertificationsPageTemplate } from '../../templates/certifications-page'

const CertificationsPagePreview = ({ entry, widgetFor }) => (
  <CertificationsPageTemplate
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    content={widgetFor('body')}
    contentComponent={HTMLContent}
  />
)

CertificationsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
}

export default CertificationsPagePreview
