/* @flow */
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { connectRoutes } from 'redux-first-router'
import ReduxThunk from 'redux-thunk'
import routesMap from '../routes'
import hooks from '../hooks'
import * as reducers from '../reducers'
import * as actionCreators from '../actions'

export default (initialEntries: Object, preLoadedState: Object) => {
  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    routesMap,
    {
      ...hooks,
      ...initialEntries
    }
  )

  const rootReducer = combineReducers({ ...reducers, location: reducer })
  const middlewares = applyMiddleware(middleware, ReduxThunk)
  const enhancers = composeEnhancers(enhancer, middlewares)
  const store = createStore(rootReducer, preLoadedState, enhancers)

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('../reducers/index', () => {
      const reducers = require('../reducers/index') // eslint-disable-line global-require
      const rootReducer = combineReducers({ ...reducers, location: reducer })
      store.replaceReducer(rootReducer)
    })
  }

  return { store, thunk }
}

const composeEnhancers = (...args) =>
  typeof window !== 'undefined'
    ? composeWithDevTools({ actionCreators })(...args)
    : compose(...args)
