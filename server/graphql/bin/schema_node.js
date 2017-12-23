import { GraphQLSchema } from 'graphql'
import RootQueryType from '../types/RootQueryType'
import mutation from '../mutations'

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
})
