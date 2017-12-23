export default (state = 'React-Drupal Boilerplate', action = {}) => {
  switch (action.type) {
    case 'HOME':
      return 'Welcome | React-Drupal Boilerplate'
    case 'LOGIN':
      return 'Login | React-Drupal Boilerplate'
    case 'LOGOUT':
      return 'Logout | React-Drupal Boilerplate'
    default:
      return state
  }
}
