import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class PageTemplate extends Component {
  render() {
    return (
      <div>
        <h1>Hey there</h1>
      </div>
    )
  }
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired
}
