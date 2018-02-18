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
  },
  {
    loader: 'image-webpack-loader',
    options: {
      mozjpeg: {
        progressive: true,
        quality: 100
      },
      optipng: {
        enabled: false,
      },
      pngquant: {
        quality: '65-90',
        speed: 4
      },
      gifsicle: {
        interlaced: false,
      },
      webp: {
        quality: 50
      }
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
  devtool: 'source-map',
  entry: ['babel-polyfill', 'fetch-everywhere', res('../server/render.js')],
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
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 50
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
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
        loader: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
                minimize: {
                  autoprefixer: {
                    add: true,
                    remove: true,
                    browsers: ['last 2 versions']
                  },
                  discardComments: {
                    removeAll: false
                  },
                  discardUnused: true,
                  mergeIdents: false,
                  reduceIdents: false,
                  safe: true,
                  sourceMap: true
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }))
      },
      {
        test: /\.local\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
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
                  sourceMap: true
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
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
    alias: {
      'react': path.join(__dirname, '..', 'node_modules', 'react')
    },
    extensions: ['.js', '.css', '.scss']
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new DotenvPlugin({
      sample: './.env.sample',
      path: './.env'
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
      allChunks: true,
      disable: false
    }),
    new CopyWebpackPlugin([
      { from: 'public' }
    ], {
      copyUnmodified: true
    })
  ]
}
