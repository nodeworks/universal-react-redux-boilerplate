/* @flow */
import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './styles.scss'

type Props = {
  children: any
}

class PageLayout extends Component<Props> { // eslint-disable-line
  props: Props

  render() {
    return (
      <div className='app'>
        <Container>
          <Header />
        </Container>
        <Container>
          <div className='app-body'>
            <main className='main'>
              {this.props.children}
            </main>
          </div>
        </Container>
        <Container>
          <Footer />
        </Container>
      </div>
    )
  }
}

export default PageLayout
