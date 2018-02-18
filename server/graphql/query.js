import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql'
import UserType from './types/UserType'
import EmailType from './types/EmailType'
import axios from 'axios'

const API_URL = process.env.API_URL || ''

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args, req) {
        if (!req.user) return []
        return axios.get(`${API_URL}/users?_format=hal_json&cachebuster=${Math.random()}`, {
          headers:
            {
              Authorization: `Bearer ${req.user.access_token}`
            }
        }).then((res) => {
          return res.data
        })
      }
    },
    email: {
      type: EmailType,
      args: {
        id: {
          description: 'ID of the email to send',
          type: new GraphQLNonNull(GraphQLString),
        },
        type: {
          description: 'The type of email',
          type: new GraphQLNonNull(GraphQLString),
        }
      },
      resolve(parentValue, { id, type }, req) {
        if (!req.user) return []
        return axios.get(`${API_URL}/email/${type}/${id}?_format=json&cachebuster=${Math.random()}`, {
          headers:
            {
              Authorization: `Bearer ${req.user.access_token}`
            }
        }).then((res) => {
          return res.data
        })
      }
    }
  }
})

export default RootQueryType
