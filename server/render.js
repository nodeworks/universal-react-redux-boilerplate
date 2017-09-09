import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import ejs from 'ejs'
import configureStore from './configureStore'
import App from '../src/app'

export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res)
  if (!store) return // no store means redirect was already served

  const app = createApp(App, store)
  const appString = ReactDOM.renderToString(app)
  const stateJson = JSON.stringify(store.getState())
  const chunkNames = flushChunkNames()
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  console.log('REQUESTED PATH:', req.path) // eslint-disable-line no-console
  console.log('CHUNK NAMES', chunkNames) // eslint-disable-line no-console

  ejs.renderFile('./src/templates/index.ejs',
    { js, styles, cssHash, appString, stateJson },
    (err, str) => res.send(str))
}

const createApp = (App, store) => (
  <Provider store={store}>
    <App />
  </Provider>
)
