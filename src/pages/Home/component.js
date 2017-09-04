/* @flow */
import React, { Component } from 'react'
import { injector } from 'react-services-injector'
import _ from 'lodash'
import { Helmet } from "react-helmet"

type State = {
  messages: Object
}

class Home extends Component {
  state: State

  componentWillMount () {
    this.state = {
      messages: {}
    }

    // const { Firebase } = this.services
    //
    // Firebase.get((ref) => {
    //   let messagesRef = ref.database().ref('messages')
    //   messagesRef.on('child_added', (msg) => {
    //     if (this.state.messages[msg.key]) {
    //       return
    //     }
    //
    //     let msgVal = msg.val()
    //     msgVal.key = msg.key
    //     this.state.messages[msgVal.key] = msgVal
    //     this.setState({ messages: this.state.messages })
    //   })
    //
    //   messagesRef.on('child_removed', (msg) => {
    //     let key = msg.key
    //     delete this.state.messages[key]
    //     this.setState({ messages: this.state.messages })
    //   })
    // })
  }

  render () {
    let messageNodes = _.values(this.state.messages).map((message, k) => {
      return (
        <h1 key={k}>{message.message}</h1>
      )
    })

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {messageNodes}
      </div>
    )
  }
}

export default injector.connect(Home, {
  toRender: []
})
