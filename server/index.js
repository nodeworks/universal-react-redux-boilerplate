import 'babel-polyfill'
import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import clientConfig from '../webpack/client.dev'
import serverConfig from '../webpack/server.dev'

const DEV = process.env.NODE_ENV === 'development' // eslint-disable-line
const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server);

app.use(compression())
app.use(cookieParser())

app.use((req, res, next) => {
  const cookie = req.cookies.jwToken
  const jwToken = 'fake' // TRY: set to 'real' to authenticate ADMIN route

  if (cookie !== jwToken) {
    res.cookie('jwToken', jwToken, { maxAge: 900000 })
    req.cookies.jwToken = jwToken
  }

  next()
})

io.on('connection', socket => {
  socket.on('bank', async () => {
    // let creds = await BoA.getCreds(socket)
    // let test2 = await BoA.getBankBalance(creds, socket)
  })
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

server.listen(3000, () => {
  console.log('Listening @ http://localhost:3000/') // eslint-disable-line no-console
})
