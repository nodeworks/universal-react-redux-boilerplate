/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import Navigation from '../Navigation'
import { goToAdmin } from '../../actions'

type Props = {
  siteTitle: string,
  updateApp: Function
}

type State = {
  isOpen: boolean,
  dropdownOpen: boolean
}

class Header extends Component<Props, State> {
  props: Props
  state: State

  componentWillMount() {
    this.props.updateApp()
  }

  render() {
    return (
      <header>
        <h1>{this.props.siteTitle}</h1>
        <Navigation />
        <button
          onClick={() => toastr.success('The title', 'The message')}
          type='button'
        >
          Toastr Success
        </button>
      </header>
    )
  }
}

const mapStateToProps = (state: Object) => ({
  siteTitle: state.app.title
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateApp: () => {
    dispatch(goToAdmin())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
