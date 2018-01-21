process.env.NODE_ENV = 'production';
var debug = process.env.NODE_ENV !== 'production';
// var debug = false;
var webpack = require('webpack');
var path = require('path');
// require("babel-polyfill");

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: ['babel-polyfill', './js/client.js'],
  module:
  {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
    }]
  },
  output:
  {
    path: __dirname + "/src/",
    filename: "client.min.js",
    publicPath: '/'
  },
  plugins: debug ? [] : [
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
