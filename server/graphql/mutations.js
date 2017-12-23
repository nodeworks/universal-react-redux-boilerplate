import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import axios from 'axios'
import Twilio from 'twilio'
import UserType from './types/UserType'
import SMSType from './types/SMSType'
import { Signup, Login } from '../auth'

const API_URL = process.env.API_URL || ''
const TWILIO_FROM = process.env.TWILIO_FROM || ''
const TWILIO_ID = process.env.TWILIO_ID || false
const TWILIO_SECRET = process.env.TWILIO_SECRET || ''

let client = false
if (TWILIO_ID) {
  client = new Twilio(TWILIO_ID, TWILIO_SECRET)
}

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return Signup({ email, password, req })
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req
        req.logout()
        return user
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return Login({ email, password, req })
      }
    },
    passreset: {
      type: UserType,
      args: {
        mail: { type: GraphQLString }
      },
      resolve(parentValue, { mail }) {
        return axios.post(`${API_URL}/user/password?_format=json&cachebuster=${Math.random()}`, {
          mail
        }).then((res) => {
          return res.data
        })
      }
    },
    passupdate: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        timestamp: { type: GraphQLInt },
        token: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { id, timestamp, token, password }) {
        return axios.post(`${API_URL}/reset/${id}/${timestamp}/${token}?_format=json&cachebuster=${Math.random()}`, {
          password
        }).then((res) => {
          return res.data
        })
      }
    },
    sendsms: {
      type: SMSType,
      args: {
        to: { type: GraphQLString },
        body: { type: GraphQLString }
      },
      resolve(parentValue, { to, body }) {
        return client.messages.create({
          body: body,
          to: to,
          from: TWILIO_FROM
        })
        .then((message) => {
          return message
        })
      }
    }
  }
})

export default mutation
