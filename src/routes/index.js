/* @flow */
const sectionTitles = {
  home: 'Home'
}

export default {
  HOME: {
    path: '/',
    breadcrumb: [sectionTitles.home]
  },
  LOGIN: '/login',
  LOGOUT: '/logout',
  PASSWORD_RESET: '/user/reset/:id/:timestamp/:token'
}
