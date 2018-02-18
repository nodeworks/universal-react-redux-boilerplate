const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const env = require('node-env-file')
const multi = require('multi-loader')
const combineLoaders = require('webpack-combine-loaders')

let fonts = []
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

env(path.resolve(__dirname, '../.env'), {
  verbose: false,
  overwrite: false,
  raise: false
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
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'fetch-everywhere',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js')
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../client'),
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
                importLoaders: 1,
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
    new WriteFilePlugin(), // used so you can see what chunks are produced in dev
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new AutoDllPlugin({
      context: path.join(__dirname, '..'),
      filename: '[name].js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'history/createBrowserHistory',
          'transition-group',
          'redux-first-router',
          'redux-first-router-link',
          'fetch-everywhere',
          'babel-polyfill',
          'redux-devtools-extension/logOnlyInProduction'
        ]
      }
    }),
    new DotenvPlugin({
      sample: './.env.sample',
      path: './.env'
    }),
    new BrowserSyncPlugin(
      {
        open: false,
        host: 'localhost',
        port: parseInt(process.env.PORT) + 1,
        proxy: `http://localhost:${process.env.PORT}`,
        ui: {
          port: parseInt(process.env.PORT) + 2
        }
      },
      {
        reload: false
      }
    ),
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
