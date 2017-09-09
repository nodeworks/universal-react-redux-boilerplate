/* @flow */
export default {
  HOME: {
    path: '/'
  },
  SUBPAGE: {
    path: '/subpage',
    thunk: (dispatch: Function, getState: Function) => {
      const { title } = getState()
      dispatch({ type: 'HOME', payload: { title } })
    },
    component: 'Subpage'
  },
  LOGIN: '/login'
}
