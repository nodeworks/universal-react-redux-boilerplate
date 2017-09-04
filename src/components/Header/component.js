/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigation from '../Navigation'
import { goToAdmin } from '../../actions'

type State = {
  isOpen: boolean,
  dropdownOpen: boolean
}

type Props = {
  siteTitle: string,
  updateApp: Function
}

class Header extends Component {
  props: Props
  state: State

  componentWillMount () {
    this.props.updateApp()
  }

  render () {
    return (
      <header>
        <h1>{this.props.siteTitle}</h1>
        <Navigation />
      </header>
    )
  }
}

const mapStateToProps = (state: Object) => {
  return {
    siteTitle: state.app.title
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    updateApp: () => {
      dispatch(goToAdmin())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
