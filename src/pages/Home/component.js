/* @flow */
import React, { Component } from 'react'
import _ from 'lodash'
import { Helmet } from 'react-helmet'
import Firebase from '../../services/firebase'

type Props = {}

type State = {
  messages: Object
}

class Home extends Component<Props, State> {
  state: State

  constructor() {
    super()

    this.state = {
      messages: {}
    }
  }

  componentWillMount() {
    const FirebaseService = new Firebase()

    FirebaseService.get(ref => {
      const messagesRef = ref.database().ref('messages')
      messagesRef.on('child_added', msg => {
        if (this.state.messages[msg.key]) {
          return
        }

        const msgVal = msg.val()
        msgVal.key = msg.key
        this.state.messages[msgVal.key] = msgVal
        this.setState({ messages: this.state.messages })
      })

      messagesRef.on('child_removed', msg => {
        const key = msg.key
        delete this.state.messages[key]
        this.setState({ messages: this.state.messages })
      })
    })
  }

  render() {
    const messageNodes = _.values(this.state.messages)
      .map(message => (<h1 key={message.key}>{message.message}</h1>))

    return (
      <div>
        <Helmet>
          <meta charSet='utf-8' />
          <title>My Title</title>
        </Helmet>
        {messageNodes}
      </div>
    )
  }
}

export default Home
