'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackHotServerMiddleware = require('webpack-hot-server-middleware');

var _webpackHotServerMiddleware2 = _interopRequireDefault(_webpackHotServerMiddleware);

var _client = require('../webpack/client.dev');

var _client2 = _interopRequireDefault(_client);

var _server = require('../webpack/server.dev');

var _server2 = _interopRequireDefault(_server);

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var DEV = process.env.NODE_ENV === 'development';
var publicPath = _client2.default.output.publicPath;
var outputPath = _client2.default.output.path;
var app = (0, _express2.default)();

// JWTOKEN COOKIE - in a real app obviously you set this after signup/login:

app.use((0, _cookieParser2.default)());

app.use(function (req, res, next) {
  var cookie = req.cookies.jwToken;
  var jwToken = 'fake'; // TRY: set to 'real' to authenticate ADMIN route

  if (cookie !== jwToken) {
    res.cookie('jwToken', jwToken, { maxAge: 900000 });
    req.cookies.jwToken = jwToken;
  }

  next();
});

// API

app.get('/api/videos/:category', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var jwToken, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            jwToken = req.headers.authorization.split(' ')[1];
            _context.next = 3;
            return (0, _api.findVideos)(req.params.category, jwToken);

          case 3:
            data = _context.sent;

            res.json(data);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

app.get('/api/video/:slug', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var jwToken, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            jwToken = req.headers.authorization.split(' ')[1];
            _context2.next = 3;
            return (0, _api.findVideo)(req.params.slug, jwToken);

          case 3:
            data = _context2.sent;

            res.json(data);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (DEV) {
  var multiCompiler = (0, _webpack2.default)([_client2.default, _server2.default]);
  var clientCompiler = multiCompiler.compilers[0];

  app.use((0, _webpackDevMiddleware2.default)(multiCompiler, { publicPath: publicPath }));
  app.use((0, _webpackHotMiddleware2.default)(clientCompiler));
  app.use(
  // keeps serverRender updated with arg: { clientStats, outputPath }
  (0, _webpackHotServerMiddleware2.default)(multiCompiler, {
    serverRendererOptions: { outputPath: outputPath }
  }));
} else {
  var clientStats = require('../buildClient/stats.json'); // eslint-disable-line import/no-unresolved
  var serverRender = require('../dist/main.js').default; // eslint-disable-line import/no-unresolved

  app.use(publicPath, _express2.default.static(outputPath));
  app.use(serverRender({ clientStats: clientStats, outputPath: outputPath }));
}

app.listen(3000, function () {
  console.log('Listening @ http://localhost:3000/');
});
