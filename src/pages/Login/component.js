/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import CurrentUserQuery from '../../graphql/queries/currentuser.gql'
import LoginMutation from '../../graphql/mutations/login.gql'
import PassResetMutation from '../../graphql/mutations/passreset.gql'
import PassUpdateMutation from '../../graphql/mutations/passupdate.gql'
import ResetForm from './ResetForm'
import LoginForm from './LoginForm'
import FlashMessages from './FlashMessages'
import loader from '../../components/Loader/pie.svg'

type Props = {
  data: any,
  LoginMutation: Function,
  dispatch: Function,
  client: any,
  location: Object
}

type State = {
  username: string,
  email: string,
  password: string,
  password_change: string,
  password_change2: string,
  errors: Array<any>,
  messages: Array<any>,
  passReset: boolean,
  changePassForm: boolean
}

class Login extends Component<Props, State> {
  props: Props
  state: State
  loginForm: any
  loaderWrap: any
  password: any
  username: any

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      password_change: '',
      password_change2: '',
      errors: [],
      messages: [],
      passReset: false,
      changePassForm: false
    }
  }

  componentDidMount() {
    if (this.props.location.payload.token) {
      this.setState({
        passReset: true,
        changePassForm: true
      })
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.dispatch({ type: 'DASHBOARD' })
    }
  }

  setRef = (name, el) => {
    // $FlowFixMe
    this[name] = el
  }

  togglePassReset = () => {
    let resetStatus = true
    if (this.state.passReset) {
      resetStatus = false
    }

    this.setState({
      passReset: resetStatus,
      errors: [],
      messages: []
    })
  }

  onSubmitChange = event => {
    event.preventDefault()

    let errors = false

    // $FlowFixMe
    const password = $(this.password_change).val() // eslint-disable-line no-undef

    // $FlowFixMe
    const password2 = $(this.password_change2).val() // eslint-disable-line no-undef

    if (password === '' || password2 === '') {
      errors = true
      this.setState({
        errors: ['Please enter a password']
      })
    }

    if (password !== password2) {
      errors = true
      this.setState({
        errors: ['Please make sure both password fields match']
      })
    }

    // $FlowFixMe
    $(this.loaderWrap).removeClass('d-none') // eslint-disable-line no-undef

    // $FlowFixMe
    TweenMax.to(this.loginForm, 0.5, { marginTop: '-1000px', ease: Power2.easeOut }) // eslint-disable-line no-undef

    let { id, timestamp, token } = this.props.location.payload
    if (!errors) {
      this.props.client.mutate({
        mutation: PassUpdateMutation,
        variables: {
          id,
          timestamp,
          token,
          password
        }
      })
      .then(res => {
        setTimeout(() => {
          // $FlowFixMe
          $(this.loaderWrap).addClass('d-none') // eslint-disable-line no-undef

          // $FlowFixMe
          TweenMax.to(this.loginForm, 0.5, { marginTop: '0', ease: Power2.easeOut }) // eslint-disable-line no-undef
        }, 500)

        this.setState({
          passReset: false,
          changePassForm: false,
          messages: ["Successfully changed you password! You may now log in"]
        })

        this.props.dispatch({ type: 'LOGIN' })
      })
      .catch(res => {
        setTimeout(() => {
          // $FlowFixMe
          $(this.loaderWrap).addClass('d-none') // eslint-disable-line no-undef

          // $FlowFixMe
          TweenMax.to(this.loginForm, 0.5, { marginTop: '0', ease: Power2.easeOut }) // eslint-disable-line no-undef
        }, 1000)

        const errors = res.graphQLErrors.map(error => error.message)
        this.setState({ errors })
      })
    }
  }

  onSubmitReset = event => {
    event.preventDefault()

    // $FlowFixMe
    const email = $(this.email).val() // eslint-disable-line no-undef

    if (email === '') {
      this.setState({
        errors: ['Please enter your email']
      })
    } else {
      // $FlowFixMe
      $(this.loaderWrap).removeClass('d-none') // eslint-disable-line no-undef

      // $FlowFixMe
      TweenMax.to(this.loginForm, 0.5, { marginTop: '-1000px', ease: Power2.easeOut }) // eslint-disable-line no-undef
      this.props.client.mutate({
        mutation: PassResetMutation,
        variables: { mail: email }
      })
      .then(res => {
        if (res.data.errors) {
          const errors = res.data.errors.map(error => error)
          this.setState({ errors })
        } else {
          setTimeout(() => {
            // $FlowFixMe
            $(this.loaderWrap).addClass('d-none') // eslint-disable-line no-undef

            // $FlowFixMe
            TweenMax.to(this.loginForm, 0.5, { marginTop: '0', ease: Power2.easeOut }) // eslint-disable-line no-undef
          }, 500)

          this.setState({
            passReset: false,
            changePassForm: false,
            errors: [],
            messages: ['Check your email shortly for a password reset link']
          })
        }
      })
      .catch(res => {
        setTimeout(() => {
          // $FlowFixMe
          $(this.loaderWrap).addClass('d-none') // eslint-disable-line no-undef

          // $FlowFixMe
          TweenMax.to(this.loginForm, 0.5, { marginTop: '0', ease: Power2.easeOut }) // eslint-disable-line no-undef
        }, 1000)

        const errors = res.graphQLErrors.map(error => error.message)
        this.setState({ errors })
      })
    }
  }

  onChange = (type, val) => {
    this.setState({
      [type]: val
    })
  }

  onSubmit = event => {
    event.preventDefault()

    // $FlowFixMe
    const username = $(this.username).val() // eslint-disable-line no-undef
    const password = $(this.password).val() // eslint-disable-line no-undef

    if (username === '' || password === '') {
      this.setState({
        errors: ['Please enter your username and password']
      })

      return
    }

    // $FlowFixMe
    $(this.loaderWrap).removeClass('d-none') // eslint-disable-line no-undef

    // $FlowFixMe
    TweenMax.to(this.loginForm, 0.5, { marginTop: '-1000px', ease: Power2.easeOut }) // eslint-disable-line no-undef
    this.props.LoginMutation({
      variables: { email: this.state.username, password: this.state.password },
      refetchQueries: [{ query: CurrentUserQuery }]
    })
    .then(() => {
      if (this.props.data.user) {
        this.props.dispatch({ type: 'HOME' })
      }
    })
    .catch(res => {
      setTimeout(() => {
        // $FlowFixMe
        $(this.loaderWrap).addClass('d-none') // eslint-disable-line no-undef

        // $FlowFixMe
        TweenMax.to(this.loginForm, 0.5, { marginTop: '0', ease: Power2.easeOut }) // eslint-disable-line no-undef
      }, 1000)

      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  render() {
    return (
      <div>
        <div
          className={'loader fullpage no-offset d-none'}
          ref={loaderWrap => {
            this.loaderWrap = loaderWrap
          }}
        >
          <img alt='Loading' src={loader} />
        </div>
        <div
          className='login-page'
          ref={loginForm => {
            this.loginForm = loginForm
          }}
        >
          <h1 className='text-center'>React-Drupal</h1>
          <div className='form'>
            <FlashMessages errors={this.state.errors} messages={this.state.messages} />
            {this.state.passReset
              ? (<ResetForm
                email={this.state.email}
                passwordChange={this.state.password_change}
                passwordChange2={this.state.password_change2}
                onChange={this.onChange}
                setRef={this.setRef}
                togglePassReset={this.togglePassReset}
                onSubmitReset={this.onSubmitReset}
                onSubmitChange={this.onSubmitChange}
                changePassForm={this.state.changePassForm}
              />)

              : (<LoginForm
                username={this.state.username}
                password={this.state.password}
                onSubmit={this.onSubmit}
                setRef={this.setRef}
                togglePassReset={this.togglePassReset}
                onChange={this.onChange}
              />)
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const location = state.location ? state.location : false

  return {
    location
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  dispatch
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(CurrentUserQuery),
  graphql(LoginMutation, { name: 'LoginMutation' })
)(withApollo(Login))
