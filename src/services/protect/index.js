import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import CurrentUserQuery from '../../graphql/queries/currentuser.gql'

export default WrappedComponent => {
  class Protect extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        this.props.dispatch({ type: 'LOGIN' })
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return compose(
    connect(),
    graphql(CurrentUserQuery)
  )(Protect)
}
