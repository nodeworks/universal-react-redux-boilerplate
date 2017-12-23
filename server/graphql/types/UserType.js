import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt } from 'graphql'
import ImageType from './ImageType'

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {
      type: GraphQLID,
      resolve: function(user) {
        return user.user_id
      }
    },
    uuid: {
      type: GraphQLString,
      resolve: function(user) {
        return user.uuid
      }
    },
    user_id: {
      type: GraphQLInt,
      resolve: function(user) {
        return user.user_id
      }
    },
    prefix: {
      type: GraphQLString,
      resolve: function(user) {
        return user.prefix
      }
    },
    first_name: {
      type: GraphQLString,
      resolve: function(user) {
        return user.first_name
      }
    },
    last_name: {
      type: GraphQLString,
      resolve: function(user) {
        return user.last_name
      }
    },
    username: {
      type: GraphQLString,
      resolve: function(user) {
        return user.username
      }
    },
    image: {
      type: ImageType,
      resolve: function(user) {
        return user.image
      }
    },
    bio: {
      type: GraphQLString,
      resolve: function(user) {
        return user.bio
      }
    },
    external_id: {
      type: GraphQLString,
      resolve: function(user) {
        return user.external_id
      }
    },
    status: {
      type: GraphQLBoolean,
      resolve: function(user) {
        return user.status
      }
    },
    mail: {
      type: GraphQLString,
      resolve: function(user) {
        return user.mail
      }
    },
    goal: {
      type: GraphQLInt,
      resolve: function(user) {
        return user.goal
      }
    },
    data: {
      type: new GraphQLList(GraphQLString),
      resolve: function(user) {
        return JSON.stringify(user.data);
      }
    },
    created: {
      type: GraphQLString,
      resolve: function(user) {
        return user.created
      }
    },
    changed: {
      type: GraphQLString,
      resolve: function(user) {
        return user.changed
      }
    },
    last_login: {
      type: GraphQLString,
      resolve: function(user) {
        return user.last_login
      }
    },
    roles: {
      type: new GraphQLList(GraphQLString),
      resolve: function(user) {
        return user.roles
      }
    }
  }
})

export default UserType
