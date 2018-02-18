const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const multi = require('multi-loader')
const combineLoaders = require('webpack-combine-loaders')

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
  },
  {
    loader: 'image-webpack-loader',
    options: {
      mozjpeg: {
        progressive: true,
        quality: 65
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
  entry: [
    'babel-polyfill',
    'fetch-everywhere',
    path.resolve(__dirname, '../src/index.js')
  ],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
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
        loader: extractStyles.extract({
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
    new StatsPlugin('stats.json'),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].[chunkhash].js',
      minChunks: Infinity
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
    new webpack.HashedModuleIdsPlugin(),
    new AutoDllPlugin({
      context: path.join(__dirname, '..'),
      filename: '[name].js',
      plugins: [
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
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
      ],
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'history/createBrowserHistory',
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
    extractStyles,
    new CopyWebpackPlugin([
      { from: 'public' }
    ], {
      copyUnmodified: true
    })
  ]
}
