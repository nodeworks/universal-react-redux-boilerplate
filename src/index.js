/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import ReduxToastr from 'react-redux-toastr'
import App from './app'
import configureStore from './config/configureStore'

const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
})

const errorLink = onError(({ operation, response, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

    if (operation.operationName === 'PassReset') {
      response.errors = [{ message: "We can't find this email, please try again!" }]
    }

    if (operation.operationName === 'PassUpdate') {
      response.errors = [{ message: "We had trouble updating your password. Please try again or contact us!" }]
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache()
})

const { store } = configureStore({}, window.REDUX_STATE)

const render = App => {
  const root = document.getElementById('root')

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <div>
            <App />
            <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              preventDuplicates
              position='top-right'
              transitionIn='bounceIn'
              transitionOut='bounceOut'
              progressBar
            />
          </div>
        </ApolloProvider>
      </Provider>
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./app', () => {
    const App = require('./app').default // eslint-disable-line global-require
    render(App)
  })
}
