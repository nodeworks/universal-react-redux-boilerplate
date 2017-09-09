/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Nav,
  NavItem,
  NavDropdown,
  NavbarBrand,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  Collapse,
  Container,
  Navbar,
  NavbarToggler } from 'reactstrap'

type Props = {}

type State = {
  isOpen: boolean,
  dropdownOpen: boolean
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
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleItem() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    return (
      <Navbar color='faded' light toggleable>
        <Container>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href='/'>MyApp</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='#'>Inclusive Design</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://github.com/reactstrap/reactstrap'>Github</NavLink>
              </NavItem>
              <NavDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleItem}
              >
                <DropdownToggle nav caret>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </NavDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default connect()(Navigation)
