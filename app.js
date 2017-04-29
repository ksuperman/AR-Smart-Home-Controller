var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* i18n Configuration  */
var i18n = require('i18n');
i18n.configure({
    locales:['en', 'fr'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    cookie: 'i18n'
});

/* Setup Routes for the Application*/
var index = require('./routes/index');
var users = require('./routes/users');
var arcontroller = require('./routes/ar_controller');

/* Application init */
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Session Management */
app.use(cookieParser("i18n_demo"));
app.use(session({
    secret: "i18n_demo",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

/* i18n Init*/
app.use(i18n.init);

/* SASS Middleware */
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

/* Middleware Static Folder Initialization */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components' ,express.static(path.join(__dirname, 'bower_components')));

/* Middleware Request Interceptor */
app.use(function(req, res, next) {
    var current_locale = i18n.getLocale();
    console.log(current_locale, res.__('Hello i18n'));
    next();
});

/* Application Routes */
app.use('/', index);
app.use('/users', users);
app.use('/arcontroller', arcontroller);

/* Error Interceptor */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* Error Handlers */
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
