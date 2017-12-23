/* @flow */
import React from 'react'

type Props = {
  errors: Array<any>,
  messages: string
}

const FlashMessages = ({ errors = [], messages = [] }: Props) => (
  <div>
    {errors.length > 0
      && (
        <div className='errors mb-4'>
          {errors.map(error => <div key={error}>{error}</div>)}
        </div>
      )
    }

    {messages.length > 0
      && (
        <div className='success-msg mb-4'>
          {messages.map(message => <div key={message}>{message}</div>)}
        </div>
      )
    }
  </div>
)

export default FlashMessages
