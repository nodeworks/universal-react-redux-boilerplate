/* @flow */
import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'

type Props = {
  target: string,
  title: string,
  text: string
}

type State = {
  tooltipOpen: boolean
}

class ToolTip extends Component<Props, State> {
  props: Props
  state: State = {
    tooltipOpen: false
  }

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  render() {
    return (
      <Tooltip placement='right' isOpen={this.state.tooltipOpen} target={this.props.target} toggle={this.toggle}>
        <h4>{this.props.title}</h4>
        {this.props.text}
      </Tooltip>
    )
  }
}

export default ToolTip
