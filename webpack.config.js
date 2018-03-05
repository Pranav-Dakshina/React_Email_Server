// process.env.NODE_ENV = 'production';
process.env.NODE_ENV = 'development';
var debug = process.env.NODE_ENV !== 'production';
// var debug = false;
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// require('babel-polyfill');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : false,
  entry: ['babel-polyfill', './js/client.js'],
  module:
  {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        loader: 'style!css!csscomb'
      }
    ]
  },
  output:
  {
    path: __dirname + '/src/',
    filename: 'client.min.js',
    publicPath: '/'
  },
  plugins: debug ? [
    new ExtractTextPlugin('style.css')
  ] : [
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin(
    {
      mangle: false,
      sourcemap: false,
    }),
  ],
};
