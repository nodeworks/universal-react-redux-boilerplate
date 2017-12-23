/* @flow */
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

type Props = {}

type State = {
  messages: Object
}

class Home extends Component<Props, State> {
  state: State

  constructor() {
    super()

    this.state = {
      messages: {}
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet='utf-8' />
          <title>My Title</title>
        </Helmet>
        <h1>Welcome!</h1>
      </div>
    )
  }
}

export default Home
