import React from 'react'
import { Provider } from 'react-redux'
import { flushChunkNames, clearChunks } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { ApolloProvider, renderToStringWithData } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../graphql.fragmentTypes.json'
import { Helmet } from 'react-helmet'
import ejs from 'ejs'
import { onError } from 'apollo-link-error'
import configureStore from './configureStore'
import App from '../src/app'
import { ReduxCache } from "apollo-cache-redux"

const errorLink = onError(({ operation, response, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )

        console.log(operation)
      }
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

const GRAPHQL_URL = process.env.GRAPHQL_URL || ''
export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res)
  if (!store) return // no store means redirect was already served

  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    credentials: 'same-origin',
    headers: {
      cookie: req.header('Cookie')
    }
  })

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  })

  const client = new ApolloClient({
    ssrMode: true,
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache({ fragmentMatcher })
  })

  clearChunks()
  const app = createApp(App, store, client)
  const appString = await renderToStringWithData(app)
  const initialState = client.extract()
  const initialStateString = `${JSON.stringify(initialState).replace(/</g, '\\u003c')};`

  const helmet = Helmet.renderStatic()
  const helmetTitle = helmet.title.toString()
  const helmetMeta = helmet.meta.toString()
  const helmetLink = helmet.link.toString()
  const stateJson = JSON.stringify(store.getState())
  const chunkNames = flushChunkNames()
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })
  const cacheBuster = Math.random()
  const favicon = process.env.NODE_ENV === 'production' ? `/static/favicon.ico?v=${cacheBuster}` : `/static/favicon-dev.ico?v=${cacheBuster}`
  const title = store.getState().title

  console.log('REQUESTED PATH:', req.path) // eslint-disable-line no-console
  console.log('CHUNK NAMES', chunkNames) // eslint-disable-line no-console

  ejs.renderFile('./src/templates/index.ejs',
    { js, styles, cssHash, appString, stateJson, helmetTitle, helmetMeta, helmetLink, favicon, title, initialStateString },
    (err, str) => res.send(str))
}

const createApp = (App, store, client) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <div>
          <App />
        </div>
      </ApolloProvider>
    </Provider>
  )
}
