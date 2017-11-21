const path = require('path')
const webpack = require('webpack')
var chalk = require('chalk')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const pageConfig = require('./page-config')

console.log(chalk.cyan('generating page config...\n'))
pageConfig()
console.log(chalk.cyan('page config done.\n'))


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  externals: {
    $: '$'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: vueConfig
          },
          {
            loader: 'iview-loader',
            options: {
              prefix: false
            }
          },
          /*
          {
            loader: "css-inject-loader",
            options: {
              lang: 'less',
              cssFile: path.join(__dirname, '../src/style/theme.less')
            }
          }*/
        ]
      },
      {
        test: /iview\/.*?js$/,
        loader: 'babel-loader'
      },
      {
        test: /(spd-page-manage|spd-webutil)\/.*?js$/,
        loader: 'babel-loader'
      },
      /*
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      */
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //exclude: /node_modules/
        include: [resolve('src'), resolve('node_modules/spd-page-manage/src'), resolve('node_modules/spd-webutil/src')]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: 'css-loader?minimize',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
      /*
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
      */
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new FriendlyErrorsPlugin()
      ]
}
