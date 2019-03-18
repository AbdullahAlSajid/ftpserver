//Declation
var express = require('express');
var bodyParser = require('body-parser');
var exSession = require('express-session');
var cookieParser = require('cookie-parser');
var website = require('./controllers/website');
var home = require('./controllers/home');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var register = require('./controllers/register');
var app = express();


//Configuration
app.set('view engine','ejs');

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret',saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use(express.static('./public'));


app.use('/login', login);
app.use('/register',register);
app.use('/home',home);
app.use('/logout',logout);
app.use('/',website);

//Routes

//Server Startup
var port = 7000;
app.listen(port,function(){
    console.log('server started at '+port);
});