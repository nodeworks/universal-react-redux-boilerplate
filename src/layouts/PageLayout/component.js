/* @flow */
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Footer from '../../components/Footer'
import './styles.scss'

type Props = {
  children: any,
  page: string,
  dispatch: Function,
  data: any
}

class PageLayout extends Component<Props> { // eslint-disable-line
  props: Props

  render() {
    return (
      <div className='app'>
        <Container fluid>
          <Row>
            <main className='main col-12 col-md-12'>
              <div className='content-section'>
                <Container fluid>
                  <Row>
                    <Col xs='12'>
                      {this.props.children}
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
  }
}

export default compose(
  connect()
)(PageLayout)
