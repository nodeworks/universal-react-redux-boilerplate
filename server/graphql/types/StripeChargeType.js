import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt } from 'graphql'

const StripeChargeType = new GraphQLObjectType({
  name: 'StripeChargeType',
  fields: {
    id: {
      type: GraphQLID,
      resolve: function(charge) {
        return charge.id
      }
    },
    amount: {
      type: GraphQLInt,
      resolve: function(charge) {
        return charge.amount
      }
    },
    captured: {
      type: GraphQLBoolean,
      resolve: function(charge) {
        return charge.captured
      }
    },
    paid: {
      type: GraphQLBoolean,
      resolve: function(charge) {
        return charge.paid
      }
    },
    network_status: {
      type: GraphQLString,
      resolve: function(charge) {
        return charge.outcome.network_status
      }
    },
    message: {
      type: GraphQLString,
      resolve: function(charge) {
        return charge.outcome.seller_message
      }
    },
    status: {
      type: GraphQLString,
      resolve: function(charge) {
        return charge.status
      }
    },
    created: {
      type: GraphQLInt,
      resolve: function(charge) {
        return charge.created
      }
    }
  }
})

export default StripeChargeType
