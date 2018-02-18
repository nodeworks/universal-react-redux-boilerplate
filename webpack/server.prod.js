const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const multi = require('multi-loader')
const combineLoaders = require('webpack-combine-loaders')

const res = p => path.resolve(__dirname, p)

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(res('../node_modules'))
  .filter(
    x =>
      !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
        x
      )
  )
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})

const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].css',
  allChunks: true,
  disable: false
})

const fonts = []

;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject']
].forEach(font => {
  const extension = font[0]
  const mimetype = font[1]

  fonts.push({
    test: new RegExp(`\\.${extension}$`),
    loader: 'url-loader',
    options: {
      name: 'fonts/[name].[ext]',
      limit: 10000,
      mimetype
    }
  })
})

const fileLoaders = combineLoaders([
  {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]'
    }
  }
])

const fileLoadersWebP = combineLoaders([
  {
    loader: 'file-loader',
    options: {
      name: '[name].webp'
    }
  },
  {
    loader: 'image-webpack-loader',
    options: {
      webp: {
        quality: 50
      }
    }
  }
])

module.exports = {
  name: 'server',
  target: 'node',
  entry: ['fetch-everywhere', res('../server/render.js')],
  externals,
  output: {
    path: res('../dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              mimetype: 'image/svg+xml'
            }
          }
        ]
      },
      {
        test: /^((?!\.local).)*\.scss$/,
        loader: extractStyles.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: {
                  autoprefixer: {
                    add: true,
                    remove: true,
                    browsers: ['last 2 versions']
                  },
                  discardComments: {
                    removeAll: true
                  },
                  discardUnused: true,
                  mergeIdents: false,
                  reduceIdents: false,
                  safe: true,
                  sourcemap: false
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        })
      },
      {
        test: /\.local\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                modules: true,
                minimize: {
                  autoprefixer: {
                    add: true,
                    remove: true,
                    browsers: ['last 2 versions']
                  },
                  discardComments: {
                    removeAll: true
                  },
                  discardUnused: true,
                  mergeIdents: false,
                  reduceIdents: false,
                  safe: true,
                  sourcemap: false
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, '../node_modules/bootstrap/scss/_functions.scss'),
                  path.resolve(__dirname, '../node_modules/bootstrap/scss/_variables.scss'),
                  path.resolve(__dirname, '../node_modules/bootstrap/scss/_mixins.scss'),
                  path.resolve(__dirname, '../src/assets/styles/variables.scss')
                ]
              },
            }
          ]
        })
      },
      ...fonts
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.scss']
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true,
        comments: false
      },
      sourceMap: false
    }),
    new DotenvPlugin({
      sample: './.env.sample',
      path: './.env'
    }),
    extractStyles,
    new CopyWebpackPlugin([
      { from: 'public' }
    ], {
      copyUnmodified: true
    })
  ]
}
