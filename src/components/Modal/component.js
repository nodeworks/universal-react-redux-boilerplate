/* @flow */
import React, { Component } from 'react'
import { Button, Modal as RSModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

type Props = {
  buttonLabel: string,
  buttonClass: string,
  className: string,
  modalTitle: string,
  actionLabel: string,
  actionCallback: Function,
  actionParams: ?any,
  children: any
}

type State = {
  modal: boolean
}

class Modal extends Component<Props, State> {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  confirmAction = () => {
    this.toggle()
    this.props.actionCallback(this.props.actionParams)
  }

  render() {
    return (
      <div>
        <Button color={this.props.buttonClass} onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <RSModal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-primary button-green" onClick={this.confirmAction}>{this.props.actionLabel}</Button>{' '}
            <Button color="btn btn-primary button-brown" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </RSModal>
      </div>
    )
  }
}

export default Modal
