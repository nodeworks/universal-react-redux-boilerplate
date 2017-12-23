import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'
import EmailParamsType from './EmailParamsType'

const EmailType = new GraphQLObjectType({
  name: 'EmailType',
  fields: {
    id: {
      type: GraphQLString,
      resolve: function(email) {
        return email.id;
      }
    },
    to: {
      type: GraphQLString,
      resolve: function(email) {
        return email.to;
      }
    },
    from: {
      type: GraphQLString,
      resolve: function(email) {
        return email.from;
      }
    },
    reply_to: {
      type: GraphQLString,
      resolve: function(email) {
        return email['reply-to'];
      }
    },
    subject: {
      type: GraphQLString,
      resolve: function(email) {
        return email.subject;
      }
    },
    body: {
      type: GraphQLString,
      resolve: function(email) {
        return email.body;
      }
    },
    params: {
      type: EmailParamsType,
      resolve: function(email) {
        return email.params;
      }
    },
    result: {
      type: GraphQLBoolean,
      resolve: function(email) {
        return email.result;
      }
    }
  }
})

export default EmailType
