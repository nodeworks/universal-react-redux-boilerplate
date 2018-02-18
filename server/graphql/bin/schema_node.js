import { GraphQLSchema } from 'graphql'
import query from '../query'
import mutation from '../mutations'

module.exports = new GraphQLSchema({
  query,
  mutation
})
