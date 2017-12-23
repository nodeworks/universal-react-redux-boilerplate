/* @flow */
import React from 'react'

type Props = {
  username: string,
  password: string,
  onSubmit: Function,
  togglePassReset: Function,
  onChange: Function,
  setRef: Function
}

type EventStub = {
  target: any
}

const LoginForm = ({
  username,
  password,
  onSubmit,
  togglePassReset,
  onChange,
  setRef
}: Props) => (
  <form onSubmit={onSubmit} className='login-form'>
    <label className='mb-3' htmlFor='username'>Login to your dashboard</label>
    <input
      onChange={(e: EventStub) => onChange('username', e.target.value)}
      value={username}
      type='text'
      id='username'
      placeholder='username'
      ref={e => setRef('username', e)}
    />
    <input
      value={password}
      onChange={(e: EventStub) => onChange('password', e.target.value)}
      type='password'
      id='password'
      placeholder='password'
      ref={e => setRef('password', e)}
    />
    <button>login</button>
    <p className='message'>Forgot your password? <a tabIndex='-1' role='button' onClick={togglePassReset}>Password reset</a></p>
  </form>
)

export default LoginForm
