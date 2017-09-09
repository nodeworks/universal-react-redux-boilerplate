/* @flow */
import { NOT_FOUND } from 'redux-first-router'

const components = {
  HOME: 'Home',
  SUBPAGE: 'Subpage',
  LOGIN: 'Login',
  [NOT_FOUND]: 'NotFound'
}

export default (state: string = 'HOME', action: Object = {}) => components[action.type] || state
