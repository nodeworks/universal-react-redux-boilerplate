/* @flow */
import React from 'react'

export default (error: Object) =>
  (<div>
    ERROR: {error.error.stack}
  </div>)
