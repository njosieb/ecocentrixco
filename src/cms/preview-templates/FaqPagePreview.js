import PropTypes from 'prop-types'
import React from 'react'
import { HTMLContent } from '../../components/Content'
import { FaqPageTemplate } from '../../templates/faq-page'

const FaqPagePreview = ({ entry, widgetFor }) => (
  <FaqPageTemplate
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    content={widgetFor('body')}
    contentComponent={HTMLContent}
  />
)

FaqPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
}

export default FaqPagePreview
