/* @flow */
import passport from 'passport'
import CustomStrategy from 'passport-custom'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { Strategy as LinkedInStrategy } from 'passport-linkedin'
import GoogleStrategy from 'passport-google-oauth2'
import axios from 'axios'
import Querystring from 'querystring'

const API_URL = process.env.API_URL || ''
const API_CLIENT_ID = process.env.API_CLIENT_ID || ''
const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET || ''

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || 'NONE'
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || ''

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || 'NONE'
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || ''

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'NONE'
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''

const LINKEDIN_API_KEY = process.env.LINKEDIN_API_KEY || 'NONE'
const LINKEDIN_SECRET_KEY = process.env.LINKEDIN_SECRET_KEY || ''

const SITE_URL = process.env.SITE_URL || ''

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `${SITE_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'picture.width(1000)', 'email', 'name']
  },
  async (accessToken, refreshToken, profile, cb) => {
    const data = {
      profile,
      accessToken
    }

    const results = await axios.post(`${API_URL}/social/auth`, data)
    cb(null, results.data)
  }
))

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: `${SITE_URL}/auth/twitter/callback`,
    userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
  },
  async (accessToken, tokenSecret, profile, cb) => {
    const data = {
      profile,
      accessToken
    }

    const results = await axios.post(`${API_URL}/social/auth`, data)
    cb(null, results.data)
  }
))

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${SITE_URL}/auth/google/callback`,
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const data = {
      profile,
      accessToken
    }

    const results = await axios.post(`${API_URL}/social/auth`, data)
    done(null, results.data)
  }
))

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: `${SITE_URL}/auth/linkedin/callback`,
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'picture-urls::(original)']
  },
  async (accessToken, tokenSecret, profile, done) => {
    const data = {
      profile,
      accessToken
    }

    const results = await axios.post(`${API_URL}/social/auth`, data)
    done(null, results.data)
  }
))

passport.use('drupal-oauth2', new CustomStrategy(
  async (req, done) => {
    const data = {
      grant_type: 'password',
      client_id: API_CLIENT_ID,
      client_secret: API_CLIENT_SECRET,
      username: req.body.email,
      password: req.body.password,
      referrer: 'site'
    }

    try {
      const results = await axios.post(`${API_URL}/oauth/token`, Querystring.stringify(data))
      const user_get = await axios.get(`${API_URL}/user/${req.body.email}?_format=json`, { headers: { Authorization: `Bearer ${results.data.access_token}` }})
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

type SignupProps = {
  email: string,
  password: string,
  team: string,
  first_name: string,
  last_name: string,
  req: Object
}

type ReactivateProps = {
  id: string,
  password: string,
  team: string,
  req: Object
}

type PassUpdateProps = {
  id: string,
  timestamp: number,
  token: string,
  password: string,
  req: Object
}

export const Login = ({ email, password, req }: LoginProps): Promise<any> => {
  return new Promise((resolve, reject) => {
    passport.authenticate('drupal-oauth2', (err, user): void => {
      if (!user) { reject(err.response.data) }

      req.req.logIn(user, () => resolve(user))
    })({ body: { email, password } })
  })
}

export const Signup = ({ email, password, team, first_name, last_name, req }: SignupProps): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = {
      email,
      password,
      team,
      first_name,
      last_name
    }

    axios.post(`${API_URL}/register/user`, data)
      .then(res => {
        if (res.data.uuid) {
          const user = res.data

          req.req.logIn(user, () => {
            resolve(user)
          })
        } else {
          reject(res.data)
        }
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export const Reactivate = ({ id, password, team, req }: ReactivateProps): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = {
      id,
      password,
      team,
      reactivate_reset: true
    }

    axios.post(`${API_URL}/register/user`, data)
      .then(res => {
        if (res.data.uuid) {
          const user = res.data

          req.req.logIn(user, () => {
            resolve(user)
          })
        } else {
          reject(res.data)
        }
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export const PassUpdate = ({ id, timestamp, token, password, req }: PassUpdateProps): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/reset/${id}/${timestamp}/${token}?_format=json&cachebuster=${Math.random()}`, {
      password
    })
    .then((res) => {
      if (res.data.uuid) {
        const user = res.data

        req.req.logIn(user, () => {
          resolve(user)
        })
      } else {
        reject(res.data)
      }
    })
    .catch(err => {
      reject(err.data)
    })
  })
}
