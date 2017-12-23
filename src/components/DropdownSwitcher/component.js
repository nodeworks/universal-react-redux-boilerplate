/* @flow */
import React, { Component } from 'react'
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

type Props = {
  items: Array<Object>,
  activeItem: string,
  onChange: Function
}

type State = {
  dropdownOpen: boolean,
  activeItem: string
}

class DropdownSwitcher extends Component<Props, State> {
  state: State
  props: Props

  constructor(props: Props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      activeItem: props.activeItem ? props.activeItem : props.items[0].val
    }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  setActive = (item: string) => {
    if (item !== this.state.activeItem) {
      this.props.onChange(item)

      this.setState({
        activeItem: item
      })
    }
  }

  render() {
    const listItems = this.props.items.map(item => (<DropdownItem
      key={item.val}
      onClick={() => this.setActive(item.val)}
    >
      {item.title}
    </DropdownItem>))

    let activeItem = this.props.items.find(
      item => item.val === this.state.activeItem
    )

    if (!activeItem) {
      activeItem = {
        title: ''
      }
    }

    return (
      <div className='dropdownWrap d-flex justify-content-center mb-3'>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag='h2'
            onClick={this.toggle}
            data-toggle='dropdown'
            aria-expanded={this.state.dropdownOpen}
            caret
          >
            {activeItem.title}
          </DropdownToggle>
          <DropdownMenu>
            {listItems}
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}

export default DropdownSwitcher
