import { GraphQLUnionType } from 'graphql'
import UserType from '../types/UserType'
import TeamType from '../types/TeamType'

const ProfileUnionType = new GraphQLUnionType({
  name: 'ProfileUnionType',
  types: [TeamType, UserType],
  resolveType(value) {
    if (value.hasOwnProperty('name')) {
      return TeamType;
    } else {
      return UserType;
    }
  }
})

export default ProfileUnionType
