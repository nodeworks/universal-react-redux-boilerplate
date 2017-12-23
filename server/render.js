import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Helmet } from 'react-helmet'
import ejs from 'ejs'
import configureStore from './configureStore'
import App from '../src/app'

export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res)
  if (!store) return // no store means redirect was already served

  const app = createApp(App, store)
  const appString = ReactDOM.renderToString(app)
  const helmet = Helmet.renderStatic()
  const helmetTitle = helmet.title.toString()
  const helmetMeta = helmet.meta.toString()
  const helmetLink = helmet.link.toString()
  const stateJson = JSON.stringify(store.getState())
  const chunkNames = flushChunkNames()
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  console.log('REQUESTED PATH:', req.path) // eslint-disable-line no-console
  console.log('CHUNK NAMES', chunkNames) // eslint-disable-line no-console

  ejs.renderFile('./src/templates/index.ejs',
    { js, styles, cssHash, appString, stateJson, helmetTitle, helmetMeta, helmetLink },
    (err, str) => res.send(str))
}

const client = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache()
})

const createApp = (App, store) => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
)
