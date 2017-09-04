const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const project = require('../project.config')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = (file) => inProject(project.srcDir, file)

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'

const config = {
  entry: {
    normalize: [
      inProjectSrc('normalize'),
    ],
    main: [
      inProjectSrc(project.main),
    ],
  },
  output: {
    path: inProject(project.outDir),
    filename: __DEV__ ? 'js/[name].js' : 'js/[name].js',
    publicPath: project.publicPath,
  },
  resolve: {
    modules: [
      inProject(project.srcDir),
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  target: 'web',
  externals: project.externals,
  module: {
    rules: [],
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(project.env) },
      __DEV__,
      __TEST__,
      __PROD__
    }, project.globals))
  ],
}

// JavaScript
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: [
        'babel-plugin-transform-class-properties',
        'babel-plugin-syntax-dynamic-import',
        [
          'babel-plugin-transform-runtime',
          {
            helpers: true,
            polyfill: false, // we polyfill needed features in src/normalize.js
            regenerator: true,
          },
        ],
        [
          'babel-plugin-transform-object-rest-spread',
          {
            useBuiltIns: true // we polyfill Object.assign in src/normalize.js
          },
        ],
      ],
      presets: [
        'babel-preset-react',
        'flow',
        ['babel-preset-env', {
          modules: false,
          targets: {
            ie9: true,
          },
          uglify: true,
        }],
      ]
    },
  }],
})

// Styles
const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].css',
  allChunks: true,
  disable: false,
})

config.module.rules.push({
  test: /\.(sass|scss)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: project.sourcemaps,
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions'],
            },
            discardComments: {
              removeAll : true,
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: project.sourcemaps,
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: project.sourcemaps,
          includePaths: [
            inProjectSrc('styles'),
            inProjectSrc('images'),
          ],
        },
      }
    ],
  })
})
config.plugins.push(extractStyles)

// Images
config.module.rules.push({
  test    : /\.(png|jpg|gif)$/,
  loader  : 'url-loader',
  options : {
    limit : 25192,
  },
})

// Fonts
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0]
  const mimetype = font[1]

  config.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype,
    },
  })
})

// HTML Template
config.plugins.push(new HtmlWebpackPlugin({
  favicon: 'public/favicon.ico',
  template: inProjectSrc('index.ejs'),
  title: project.globals.title,
  inject: true,
  minify: {
    collapseWhitespace: true,
  },
}))

// Dotenv files
config.plugins.push(new DotenvPlugin({
  sample: './.env.sample',
  path: './.env'
}))

// Development Tools
if (__DEV__) {
  config.entry.main.push(
      `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
  )
  config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new BrowserSyncPlugin({
        open: config.browser_sync_open_window,
        host: 'localhost',
        port: 3001,
        proxy: 'http://localhost:3000',
        ui: {
          port: 3002
        },
        ghostMode: {
          clicks: true,
          forms: true,
          scroll: true
        }
      }, {
        reload: false
      }),
      new webpack.SourceMapDevToolPlugin()
  )
}

// Bundle Splitting
if (!__TEST__) {
  const bundles = ['normalize', 'manifest']

  if (project.vendors && project.vendors.length) {
    bundles.unshift('vendor')
    config.entry.vendor = project.vendors
  }
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: bundles }))
}

// Production Optimizations
if (__PROD__) {
  config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })//,
      // new webpack.optimize.UglifyJsPlugin({
      //   sourceMap: true,
      //   comments: false,
      //   compress: {
      //     warnings: false,
      //     screw_ie8: true,
      //     conditionals: true,
      //     unused: true,
      //     comparisons: true,
      //     sequences: true,
      //     dead_code: true,
      //     evaluate: true,
      //     if_return: true,
      //     join_vars: true,
      //   },
      // })
  )
}

module.exports = config
