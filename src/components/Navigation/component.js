/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'redux-first-router-link'
import {
  Nav,
  NavItem,
  Dropdown,
  NavbarBrand,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Collapse,
  Container,
  Navbar,
  NavbarToggler } from 'reactstrap'

type Props = {}

type State = {
  isOpen: boolean,
  subpage: Object
}

class Navigation extends Component<Props, State> {
  state: State
  toggle: Function
  toggleItem: Function

  constructor(props: any) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.toggleItem = this.toggleItem.bind(this)
    this.state = {
      isOpen: false,
      subpage: {
        dropdownOpen: false
      }
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleItem(item: string) {
    this.setState({
      [item]: {
        dropdownOpen: !this.state[item].dropdownOpen
      }
    })
  }

  render() {
    return (
      <Navbar className='d-md-none px-0' color='faded' light>
        <Container>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto mt-4' navbar>
              <NavLink exact to='/' className='py-2'>
                <span className='nav-text'>Home</span>
              </NavLink>
              <Dropdown
                isOpen={this.state.subpage.dropdownOpen}
                toggle={() => this.toggleItem('subpage')}
                nav
              >
                <DropdownToggle nav caret>
                  Subpage
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><NavLink to='/'><span className='nav-text'>Subpage 1</span></NavLink></DropdownItem>
                  <DropdownItem><NavLink to='/'><span className='nav-text'>Subpage 2</span></NavLink></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default connect()(Navigation)
