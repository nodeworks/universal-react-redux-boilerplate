/* @flow */
import React from 'react'

type Props = {
  email: string,
  onSubmitReset: Function,
  togglePassReset: Function,
  onChange: Function,
  setRef: Function,
  changePassForm: boolean
}

const ResetForm = ({
  email,
  passwordChange,
  passwordChange2,
  onSubmitReset,
  onSubmitChange,
  togglePassReset,
  onChange,
  setRef,
  changePassForm
}: Props) => {

  return (
    <div>
      {changePassForm
        ? (
          <form onSubmit={onSubmitChange} className='login-form'>
            <label className='mb-3' htmlFor='email'>
              Create a new password below
            </label>
            <input
              onChange={(e: any) => onChange('password_change', e.target.value)}
              value={passwordChange}
              type='password'
              id='password_change'
              placeholder='password'
              ref={e => setRef('password_change', e)}
            />
            <input
              onChange={(e: any) => onChange('password_change2', e.target.value)}
              value={passwordChange2}
              type='password'
              id='password_change2'
              placeholder='confirm password'
              ref={e => setRef('password_change2', e)}
            />
            <button>submit</button>
            <p className='message'>
              <a tabIndex='-1' role='button' onClick={togglePassReset}>Back to login</a>
            </p>
          </form>
        )
        : (
          <form onSubmit={onSubmitReset} className='login-form'>
            <label className='mb-3' htmlFor='email'>
              Enter your email to request a password reset
            </label>
            <input
              onChange={(e: any) => onChange('email', e.target.value)}
              value={email}
              type='text'
              id='email'
              placeholder='email'
              ref={e => setRef('email', e)}
            />
            <button>request reset</button>
            <p className='message'>
              <a tabIndex='-1' role='button' onClick={togglePassReset}>Back to login</a>
            </p>
          </form>
        )
      }
    </div>
  )
}

export default ResetForm
