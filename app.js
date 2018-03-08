const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

// const Comb = require('csscomb');
// var comb = new Comb('zen');
// comb.processPath('./public/css');

require('./database.js');

const app = new express();

// var port = 5000;
var port = 8080;
process.env.NODE_ENV = 'production';
// process.env.NODE_ENV = 'development';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

if (process.env.NODE_ENV !== "production") {
    console.log('development');
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
        },
      });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
}
// app.get('*', function response(req, res) {
//   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
//   res.end();
// });

app.use(express.static('./public/css'));
app.use(express.static('./public/fonts'));
app.use(express.static('./public/images'));
app.use(express.static('./public/js'));
app.use(express.static('./src'));
app.use(express.static('./node_modules'));

app.set('views', './src');
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded(
{
  extended: false
}));
app.use(bodyparser.json());

app.use(cookieParser('Thabpet'));
app.use(session({
  secret: 'thabpet',
  resave: true,
  saveUninitialized: true
}));

require('./config/passport')(app);

app.get('/', function(req, res)
{
  res.render('index');
});

app.get('/sitemap.txt', function(req, res)
{
  res.render('sitemap');
});

require('./routes/login.js')(app);
require('./routes/signup.js')(app);

app.listen(port, function(err) {

});
