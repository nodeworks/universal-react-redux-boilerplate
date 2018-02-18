import 'babel-polyfill'
import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import expressGraphQL from 'express-graphql'
import { Engine } from 'apollo-engine'
import { TraceCollector, instrumentSchemaForTracing, formatTraceData } from 'apollo-tracing'

import clientConfig from '../webpack/client.dev'
import serverConfig from '../webpack/server.dev'
import schema from './graphql/schema'

const DEV = process.env.NODE_ENV === 'development' // eslint-disable-line
const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const passport = require('passport')

const PORT = process.env.PORT || ''
const SESSION_SECRET = process.env.SESSION_SECRET || 'session_secret'
const APOLLO_ENGINE_KEY = process.env.APOLLO_ENGINE_KEY || ''

const handleAuth = (req, res) => {
  const user_status = req.user.seller_status
  const uuid = req.user.uuid
  const is_new = req.user.is_new

  if (is_new) {
    req.logOut()
    res.redirect(`/user/new/${uuid}`)

  } else {
    switch (user_status) {
      case 'inactive':
        req.logOut()
        res.redirect(`/user/inactive/${uuid}`)
        break

      case 'blocked':
        req.logOut()
        res.redirect(`/user/blocked/${uuid}`)
        break

      default:
        res.redirect('/')
        break
    }
  }
}

const engine = new Engine({
  engineConfig: {
    apiKey: APOLLO_ENGINE_KEY
  }
})

engine.start()
app.use(engine.expressMiddleware())

app.use(compression())
app.use(cookieParser(SESSION_SECRET))

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  store: new RedisStore({ db: 1 })
}))

app.use(passport.initialize())
app.use(passport.session())

// Facebook Register/Login.
app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope: ['email'] }))
app.get('/auth/facebook/callback',
  passport.authenticate('facebook',
    {
      failureRedirect: '/login'
    }
  ),
  handleAuth
)

// Twitter Register/Login.
app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/twitter/callback',
  passport.authenticate('twitter',
    {
      failureRedirect: '/login'
    }
  ),
  handleAuth
)

// Google Register/Login.
app.get('/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
  })
)

app.get( '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  handleAuth
)

app.get('/auth/linkedin',
  passport.authenticate('linkedin', {
    scope: [
      'r_basicprofile',
      'r_emailaddress'
    ]
  })
)

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    failureRedirect: '/login'
  }),
  handleAuth
)

app.use('/graphql',
  (req, res, next) => {
    const traceCollector = new TraceCollector()
    traceCollector.requestDidStart()
    req._traceCollector = traceCollector
    next()
  },
  expressGraphQL(request => {
    return {
      schema: instrumentSchemaForTracing(schema),
      context: {
        _traceCollector: request._traceCollector,
        req: request
      },
      graphiql: true,
      extensions: () => {
        const traceCollector = request._traceCollector
        traceCollector.requestDidEnd()
        return {
          tracing: formatTraceData(traceCollector)
        }
      }
    }
  })
)

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
