/* @flow */
import React, { Component } from 'react'
import { withApollo, graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import LogOutMutation from '../../graphql/mutations/logout.gql'
import currentuser from '../../graphql/queries/currentuser.gql'
import UserMenu from '../UserMenu'
import Breadcrumbs from '../Breadcrumbs'
import Avatar from '../UserMenu/person.png'
import Navigation from '../Navigation'

type Props = {
  client: Object,
  dispatch: Function,
  activePage: Object,
  data: Object
}

type State = {}

const listItems = [
  { title: 'Profile', val: 'HOME', type: 'item' },
  { title: 'Settings', val: 'SUBPAGE', type: 'item' },
  { type: 'divider', val: 'divider' },
  { title: 'Logout', val: 'LOGOUT', type: 'item' }
]

class Header extends Component<Props, State> {
  props: Props
  state: State

  constructor(props: Props) {
    super(props)

    if (this.props.data.user) {
      let {id, mail, prefix, first_name, last_name, created, image} = this.props.data.user
      window.drift.identify(id, {
        email: mail,
        name: `${prefix} ${first_name} ${last_name}`,
        startDate: created,
        avatar_url: image ? image.uri : null
      })
    }
  }

  onUserMenuChange = route => {
    if (route === 'LOGOUT') {
      this.props.client.mutate({
        mutation: LogOutMutation
      })
      .then(() => {
        this.props.dispatch({ type: 'LOGIN' })
      })
    }
    else {
      this.props.dispatch({ type: route })
    }
  }

  render() {
    let breadcrumbs
    if (this.props.activePage) {
      if (this.props.activePage.breadcrumb) {
        breadcrumbs = this.props.activePage.breadcrumb.map((item: string) => (
          <li key={item} className='list-inline-item'>
            {item}
          </li>
        ))
      }
    }

    return (
      <div className='header-bar py-2 mb-4'>
        <Container fluid>
          <Row className='align-items-center'>
            <Col xs='8' md='6'>
              <Navigation />
              <Breadcrumbs items={breadcrumbs} />
            </Col>
            <Col xs='4 align-self-start align-self-md-center pt-2 pt-md-0' md='6'>
              <div className='d-inline-flex float-right'>
                <UserMenu
                  items={listItems}
                  avatar={Avatar}
                  onChange={this.onUserMenuChange}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const activePage = state.location ? state.location.routesMap[state.location.type] : ''

  return {
    activePage
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(currentuser)
)(withApollo(Header))
