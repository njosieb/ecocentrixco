import PropTypes from 'prop-types'
import React from 'react'
import { HTMLContent } from '../../components/Content'
import { ContactPageTemplate } from '../../templates/contact-us'

const ContactPagePreview = ({ entry, widgetFor }) => (
  <ContactPageTemplate
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    content={widgetFor('body')}
    contentComponent={HTMLContent}
  />
)

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
}

export default ContactPagePreview
