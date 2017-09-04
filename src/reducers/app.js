/* @flow */
import { globals } from '../../project.config'

const initialState = { ...globals }

const appReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case 'HOME':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export default appReducer
