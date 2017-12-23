/* @flow */
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CurrentUserQuery from '../../graphql/queries/currentuser.gql'
import Loader from '../../components/Loader'
import './styles.scss'

type Props = {
  children: any,
  page: string,
  dispatch: Function,
  data: any
}

const MainWrapper = ({ children }) => (
  <div className='app'>
    <Container fluid>
      <Row>
        <main className='main col-12 col-md-12'>
          <Header />
          <div className='content-section'>
            <Container fluid>
              <Row>
                <Col xs='12'>
                  {children}
                </Col>
              </Row>
            </Container>
          </div>
        </main>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  </div>
)

const LoginWrapper = ({ children }) => (
  <Container fluid>
    <Row className='login-page-wrap'>
      <Col xs='12'>
        {children}
      </Col>
    </Row>
  </Container>
)

class PageLayout extends Component<Props> { // eslint-disable-line
  props: Props

  componentWillUpdate(nextProps: Props) {
    // Reroute if not logged in
  }

  render() {
    if (this.props.page === 'Login') {
      return (
        <LoginWrapper>
          {this.props.children}
        </LoginWrapper>
      )
    }
    if (this.props.data.loading) {
      return (
        <Loader fullPage noOffset />
      )
    }

    return (
      <MainWrapper>
        {this.props.children}
      </MainWrapper>
    )
  }
}

export default compose(
  connect(),
  graphql(CurrentUserQuery)
)(PageLayout)
