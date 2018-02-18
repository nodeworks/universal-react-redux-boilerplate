import { GraphQLObjectType, GraphQLString } from 'graphql'

const StripeErrorType = new GraphQLObjectType({
  name: 'StripeErrorType',
  fields: {
    type: {
      type: GraphQLString,
      resolve: function(charge) {
        return charge.type
      }
    },
    code: {
      type: GraphQLString,
      resolve: function(charge) {
        return charge.code
      }
    },
    message: {
      type: GraphQLString,
      resolve: function(charge) {
        return charge.message
      }
    },
    status_code: {
      type: GraphQLString,
      resolve: function(charge) {
        return charge.statusCode
      }
    }
  }
})

export default StripeErrorType
