/* @flow */
import React, { Component } from 'react'

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
        <h1>Welcome!</h1>
      </div>
    )
  }
}

export default Home
