/* @flow */
import { NOT_FOUND } from 'redux-first-router'

const components = {
  HOME: 'Home',
  LOGIN: 'Login',
  LOGOUT: 'Login',
  PASSWORD_RESET: 'Login',
  [NOT_FOUND]: 'NotFound'
}

export default (state: string = 'HOME', action: Object = {}) => components[action.type] || state
