var path = require('path');
var webpack = require('webpack');

var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');
var NODE_MODULES_PATH = path.join(__dirname, 'node_modules');


var config = {
  entry: APP_PATH,
  output: {
    path: DIST_PATH,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'StandbySpot'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ],
  module: {
    loaders: [
      { test: APP_PATH,
        loaders: ['react-hot','babel']
      }
    ],
    noParse: [],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  resolve: {
    alias: {}
  },
};


module.exports = config;
