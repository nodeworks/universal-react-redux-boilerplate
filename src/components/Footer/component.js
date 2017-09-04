/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
  siteTitle: string
}

type State = {
  year: number
}

class Footer extends Component {
  props: Props
  state: State

  constructor (props: Props) {
    super(props)

    let date = new Date()
    this.state = {
      year: date.getFullYear()
    }
  }

  render () {
    return (
      <footer className='app-footer'>
        {this.props.siteTitle} &copy; {this.state.year} Rob Lee
      </footer>
    )
  }
}

export default connect((state) => {
  return {
    siteTitle: state.app.title
  }
})(Footer)
