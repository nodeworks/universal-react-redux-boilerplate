import { GraphQLObjectType, GraphQLString } from 'graphql'

const SMSType = new GraphQLObjectType({
  name: 'SMSType',
  fields: {
    sid: {
      type: GraphQLString,
      resolve: function(message) {
        return message.sid
      }
    },
    date_created: {
      type: GraphQLString,
      resolve: function(message) {
        return message.date_created
      }
    },
    date_updated: {
      type: GraphQLString,
      resolve: function(message) {
        return message.date_updated
      }
    },
    date_sent: {
      type: GraphQLString,
      resolve: function(message) {
        return message.date_sent
      }
    },
    account_sid: {
      type: GraphQLString,
      resolve: function(message) {
        return message.account_sid
      }
    },
    to: {
      type: GraphQLString,
      resolve: function(message) {
        return message.to
      }
    },
    from: {
      type: GraphQLString,
      resolve: function(message) {
        return message.from
      }
    },
    messaging_service_sid: {
      type: GraphQLString,
      resolve: function(message) {
        return message.messaging_service_sid
      }
    },
    body: {
      type: GraphQLString,
      resolve: function(message) {
        return message.body
      }
    },
    status: {
      type: GraphQLString,
      resolve: function(message) {
        return message.status
      }
    },
    num_segments: {
      type: GraphQLString,
      resolve: function(message) {
        return message.num_segments
      }
    },
    num_media: {
      type: GraphQLString,
      resolve: function(message) {
        return message.num_media
      }
    },
    direction: {
      type: GraphQLString,
      resolve: function(message) {
        return message.direction
      }
    },
    api_version: {
      type: GraphQLString,
      resolve: function(message) {
        return message.api_version
      }
    },
    price: {
      type: GraphQLString,
      resolve: function(message) {
        return message.price
      }
    },
    price_unit: {
      type: GraphQLString,
      resolve: function(message) {
        return message.price_unit
      }
    },
    error_code: {
      type: GraphQLString,
      resolve: function(message) {
        return message.error_code
      }
    },
    error_message: {
      type: GraphQLString,
      resolve: function(message) {
        return message.error_message
      }
    },
    uri: {
      type: GraphQLString,
      resolve: function(message) {
        return message.uri
      }
    }
  }
})

export default SMSType
