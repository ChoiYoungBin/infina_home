var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

// 다국어 지원 추가
var i18n = require("i18n")
i18n.configure({
  locales: ['en', 'ko', 'zh', 'ja', 'de'],
  directory: __dirname + '/locales',
  cookie: 'lang',
  defaultLocale: 'ko' // 매번 필요 작업시 변경
});

app.use(i18n.init);

app.get('/main', function(req, res) {
  var current_locale = i18n.getLocale();

  if( current_locale == 'ko') {
    res.redirect('/main/ko/index.html');
  }
  if( current_locale == 'zh') {
    res.redirect('/main/zh/index.html');
  }
  if( current_locale == 'de') {
    res.redirect('/main/de/index.html');
  }
  else {
    res.redirect('/main/en/index.html');
  }
});

app.get('/en', function(req, res) {
  // res.cookie('lang', 'en');
  i18n.setLocale('en');
  res.redirect('/main');
});
app.get('/ko', function(req, res) {
  i18n.setLocale('ko');
  res.redirect('/main');
});
app.get('/zh', function(req, res) {
  i18n.setLocale('zh');
  res.redirect('/main');
});
app.get('/de', function(req, res) {
  i18n.setLocale('de');
  res.redirect('/main');
});
app.get('/', function(req, res) {
  res.redirect('main.html')
})

// prepare server
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// use jade... router & view
app.use('/index', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
