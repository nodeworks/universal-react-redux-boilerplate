/* @flow */
import React, { Component } from 'react'
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

type Props = {
  items: Array<Object>,
  onChange: Function,
  avatar: any
}

type State = {
  dropdownOpen: boolean
}

class UserMenu extends Component<Props, State> {
  state: State
  props: Props

  constructor(props: Props) {
    super(props)

    this.state = {
      dropdownOpen: false
    }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  setActive = (item: string) => {
    this.props.onChange(item)
  }

  render() {
    const listItems = this.props.items.map(item => {
      if (item.type === 'divider') {
        return <DropdownItem key={item.val} divider />
      }

      return (<DropdownItem
        key={item.val}
        onClick={() => this.setActive(item.val)}
      >
        {item.title}
      </DropdownItem>)
    })

    return (
      <div className='user-menu-wrap d-flex justify-content-center'>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag='h2'
            onClick={this.toggle}
            data-toggle='dropdown'
            aria-expanded={this.state.dropdownOpen}
            caret
          >
            <img className='avatar' src={this.props.avatar} alt='Avatar' />
          </DropdownToggle>
          <DropdownMenu right>
            {listItems}
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}

export default UserMenu
