/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
  route: string
}

type State = {
  collapsed: boolean
}

class Sidebar extends Component<Props, State> {
  toggler: any
  sidebar: any
  props: Props
  state: State = {
    collapsed: false
  }

  onToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <aside ref={(sidebar) => this.sidebar = sidebar} className={`sidebar col-2 py-4 px-0 d-none d-md-block`}>
        <h1>Sidebar</h1>
      </aside>
    )
  }
}

const mapStateToProps = (state: Object) => {
  let route = false
  if (state.location.routesMap[state.location.type]) {
    route = state.location.routesMap[state.location.type].parent
      ? state.location.routesMap[state.location.type].parent
      : false
  }

  return {
    route
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
