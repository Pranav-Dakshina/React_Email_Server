const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

// const Comb = require('csscomb');
// var comb = new Comb('./csscomb.json');
// comb.processPath('public/css');

require('./database.js');

const app = new express();

var port = 5000;

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler,
{
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats:
  {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
// app.get('*', function response(req, res) {
//   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
//   res.end();
// });

app.use(express.static('./public/css'));
app.use(express.static('./public/fonts'));
app.use(express.static('./public/images'));
app.use(express.static('./public/js'));
app.use(express.static('./node_modules'));

app.set('views', './src');
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded(
{
  extended: false
}));
app.use(bodyparser.json());

app.get("*", function(req, res)
{
  res.render('index');
});

app.listen(port, function(err) {

});

require('./routes/login.js')(app);
