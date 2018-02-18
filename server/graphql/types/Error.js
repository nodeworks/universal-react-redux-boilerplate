import { GraphQLObjectType, GraphQLString } from 'graphql'

const ErrorType = new GraphQLObjectType({
  name: 'ErrorType',
  fields: {
    error: {
      type: GraphQLString,
      resolve: function(err) {
        return err.error
      }
    },
    message: {
      type: GraphQLString,
      resolve: function(err) {
        return err.message
      }
    }
  }
})

export default ErrorType
