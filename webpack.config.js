// process.env.NODE_ENV = 'production';
// process.env.NODE_ENV = 'development';
const debug = process.env.NODE_ENV !== 'production';
// const debug = false;
const webpack = require('webpack');
// const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// var ExtractTextPlugin = require('extract-css-chunks-webpack-plugin');
// require('babel-polyfill');

module.exports = {
  // context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : false,
  // entry: ['babel-polyfill', './js/client.js'],
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
        // loader: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader']
        // })
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  // output:
  // {
  //   path: __dirname + '/src/',
  //   filename: 'client.min.js',
  //   publicPath: '/'
  // },
  plugins: debug ? [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "2.css"
    })
  ] : [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "2.css"
    }),
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
