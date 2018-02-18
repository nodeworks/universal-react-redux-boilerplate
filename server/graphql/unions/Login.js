import { GraphQLUnionType } from 'graphql'
import ErrorType from '../types/Error'
import UserType from '../types/UserType'

const UserUnionType = new GraphQLUnionType({
  name: 'UserUnionType',
  types: [ErrorType, UserType],
  resolveType(value) {
    if (value.hasOwnProperty('error')) {
      return ErrorType;
    } else {
      return UserType;
    }
  }
})

export default UserUnionType
