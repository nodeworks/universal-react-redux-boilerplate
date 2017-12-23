import { GraphQLObjectType, GraphQLString } from 'graphql'

const EmailParamsType = new GraphQLObjectType({
  name: 'EmailParamsType',
  fields: {
    title: {
      type: GraphQLString,
      resolve: function(params) {
        return params.title;
      }
    },
    message: {
      type: GraphQLString,
      resolve: function(params) {
        return params.message;
      }
    }
  }
})

export default EmailParamsType
