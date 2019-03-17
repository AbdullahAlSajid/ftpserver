//Declation
var express = require('express');
var bodyParser = require('body-parser');
var exSession = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();

//Configuration
app.set('view engine','ejs');

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret',saveUninitialized: true, resave: false}));
app.use(cookieParser());

//Routes

//Server Startup