/* @flow */
import passport from 'passport'
import CustomStrategy from 'passport-custom'
import axios from 'axios'
import Querystring from 'querystring'

const API_URL = process.env.API_URL || ''
const API_CLIENT_ID = process.env.API_CLIENT_ID || ''
const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET || ''

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use('drupal-oauth2', new CustomStrategy(
  async (req, done) => {
    const data = {
      grant_type: 'password',
      client_id: API_CLIENT_ID,
      client_secret: API_CLIENT_SECRET,
      username: req.body.email,
      password: req.body.password
    }

    try {
      const results = await axios.post(`${API_URL}/oauth/token`, Querystring.stringify(data))
      const user_get = await axios.get(`${API_URL}/user/1?_format=json`, { headers: { Authorization: `Bearer ${results.data.access_token}` }})
      user_get.data.access_token = results.data.access_token
      done(null, user_get.data)
    } catch (e) {
      done(e)
    }
  }
))

type LoginProps = {
  email: string,
  password: string,
  req: Object
}

export const Login = ({ email, password, req }: LoginProps): Promise<any> => {
  return new Promise((resolve, reject) => {
    passport.authenticate('drupal-oauth2', (err, user): void => {
      if (!user) { reject(err.response.data) }

      req.login(user, () => resolve(user))
    })({ body: { email, password } })
  })
}

export const Signup = ({ email, password, req }: LoginProps): Promise<any> => {
  return new Promise((resolve, reject) => {
    passport.authenticate('drupal-oauth2', (err, user): void => {
      if (!user) { reject(err.response.data) }

      req.login(user, () => resolve(user))
    })({ body: { email, password } })
  })
}
