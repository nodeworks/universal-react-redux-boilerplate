import { GraphQLUnionType } from 'graphql'
import StripeChargeType from '../types/StripeChargeType'
import StripeErrorType from '../types/StripeErrorType'

const StripeResultType = new GraphQLUnionType({
  name: 'StripeResultType',
  types: [StripeErrorType, StripeChargeType],
  resolveType(value) {
    if (value.hasOwnProperty('decline_code')) {
      return StripeErrorType;
    } else {
      return StripeChargeType;
    }
  }
})

export default StripeResultType
