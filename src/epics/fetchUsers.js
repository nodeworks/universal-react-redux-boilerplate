/* @flow */
import 'rxjs'
import type ActionsObservable from 'redux-observable'

const fetchUsersFulfilled = users => ({ type: 'FETCH_USERS_COMPLETE', users })

const fetchUsersEpic = (action$: ActionsObservable) => (
  action$.ofType('FETCH_USERS')
    .switchMap(action => {
      const filters = {
        seller_status: {
          operator: "=",
          value: 'active'
        },
        ...(action.term !== '' ? { full_name: {
            operator: "LIKE",
            value: action.term
          }} : {})
      }

      return action.client.query({
        query: action.query,
        variables: {
          filters
        }
      })
      .then(response => fetchUsersFulfilled(response.data.users_filtered))
    })
)

export default fetchUsersEpic
