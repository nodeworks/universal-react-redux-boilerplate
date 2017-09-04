/* @flow */
export default {
  HOME: {
    path: '/'
  },
  SUBPAGE: {
    path: '/subpage',
    thunk: (dispatch: Function, getState: Function) => {
      let { title } = getState()
      dispatch({ type: 'HOME', payload: { title } })
    },
    component: 'Subpage'
  },
  LOGIN: '/login',
}
