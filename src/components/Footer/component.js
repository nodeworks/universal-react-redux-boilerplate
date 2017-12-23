/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.scss'

type Props = {
  siteTitle: string
}

type State = {
  year: number
}

class Footer extends Component<Props, State> {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)

    const date = new Date()
    this.state = {
      year: date.getFullYear()
    }
  }

  render() {
    return (
      <footer className='app-footer col-12 py-2'>
        {this.props.siteTitle} &copy; {this.state.year} React-Drupal
      </footer>
    )
  }
}

const mapStateToProps = state => ({
  siteTitle: state.app.title
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
