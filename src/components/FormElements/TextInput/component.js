/* @flow */
import React, { Component } from 'react'

type Props = {
  id: string,
  label: string,
  autocomplete: ?boolean,
  usePlaceholder: ?boolean,
  useLabel: ?boolean,
  placeholderText: ?string,
  className: ?string,
  size: ?string,
  fillWidth: ?boolean,
  onChange: Function
}

type State = {
  spinnerActive: boolean
}

class TextInput extends Component<Props, State> {
  props: Props
  state: State = {
    spinnerActive: false
  }

  onChange = async (id: string, e: Event) => {
    if (this.props.onChange) {
      this.setState({
        spinnerActive: true
      })

      console.log('starting')
      await this.props.onChange(id, e)
      console.log('ending')

      this.setState({
        spinnerActive: false
      })
    }
  }

  render() {
    const size = this.props.size ? { size: this.props.size } : {}
    const fillWidth = this.props.fillWidth ? this.props.fillWidth : false

    let extraProps = {
      className: '',
      placeholder: ''
    }

    if (this.props.usePlaceholder) {
      if (this.props.placeholderText) {
        extraProps['placeholder'] = this.props.placeholderText
      } else {
        extraProps['placeholder'] = this.props.label
      }
    }

    if (fillWidth) {
      extraProps['className'] = 'w-100'
    }

    const inputItem = this.props.useLabel
      ? (
        <div className='w-100 label-top'>
          <label htmlFor={this.props.id}>{this.props.label}</label>
          <input {...size} {...extraProps} id={this.props.id} />
        </div>
      )

      : (<input onChange={this.onChange} {...size} {...extraProps} id={this.props.id} />)

    return (
      <div className={`text-input-wrap d-flex align-items-center justify-content-end ${this.state.spinnerActive ? 'autocomplete-spinner' : ''} ${this.props.className ? this.props.className : ''} ${this.props.autocomplete ? 'autocomplete' : ''} ${this.props.usePlaceholder ? 'use-placeholder' : ''} ${this.props.useLabel ? 'use-label' : ''}`}>
        {inputItem}
      </div>
    )
  }
}

export default TextInput
