// var debug = process.env.NODE_ENV !== "production";
var debug = true;
var webpack = require('webpack');
var path = require('path');
require("babel-polyfill");

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: ['babel-polyfill', "./js/client.js"],
  module:
  {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query:
      {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
      }
    }]
  },
  output:
  {
    path: __dirname + "/src/",
    filename: "client.min.js",
    publicPath: '/'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(
    {
      mangle: false,
      sourcemap: false
    }),
  ],
};
