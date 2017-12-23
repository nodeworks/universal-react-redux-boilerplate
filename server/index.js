import 'babel-polyfill'
import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import expressGraphQL from 'express-graphql'
import clientConfig from '../webpack/client.dev'
import serverConfig from '../webpack/server.dev'
import schema from './graphql/schema';

const DEV = process.env.NODE_ENV === 'development' // eslint-disable-line
const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const session = require('express-session')
const passport = require('passport')

const PORT = process.env.PORT || ''
const SESSION_SECRET = process.env.SESSION_SECRET || 'session_secret'

app.use(compression())
app.use(cookieParser())

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: process.env.NODE_ENV !== 'production'
}))

app.use('/realtime', (req, res) => {
  io.sockets.emit('orders', '')
  res.status(200).end()
})

io.on('connection', socket => {

})

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  app.use(webpackDevMiddleware(multiCompiler, { publicPath, noInfo: true }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath }
    })
  )
}
else {
  const clientStats = require('../client/stats.json') // eslint-disable-line
  const serverRender = require('../dist/main.js').default // eslint-disable-line

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, outputPath }))
}

server.listen(PORT, () => {
  console.log(`Listening @ http://localhost:${PORT}`) // eslint-disable-line no-console
})
