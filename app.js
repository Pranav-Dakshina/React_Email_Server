const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const socket = require('socket.io');

require('./database.js');

const app = new express();

// var port = 5000;
var port = 8080;
// process.env.NODE_ENV = 'production';
// process.env.NODE_ENV = 'development';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
// app.use(corsMiddleware.corsPrefetch());
app.use(cors());
app.use(fileUpload());
app.use(cookieParser('Thabpet'));
app.use(session({
  secret: 'thabpet',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: false,
  }
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
require('./routes/reset.js')(app);

const server = app.listen(port, function(err) {
  if(err) {
    console.error("Error : ", err)
  }
});

var io = module.exports.io = socket(server)

const SocketManager = require('./config/SocketManager')

io.on('connection', SocketManager);
