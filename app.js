const express = require('express'),
	  path = require('path'),
	  favicon = require('serve-favicon'),
	  logger = require('morgan'),
	  cookieParser = require('cookie-parser'),
    fs = require('fs'),
	  bodyParser = require('body-parser'),
	  films = require('./routes/films'),
    serials = require('./routes/serials'),
    load = require('./routes/load'),
	  app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/serials', serials);
app.use('/api/films', films);
app.use('/api/load', load);

app.get('/', function(req, res, next) {
    return res.send({ status: 'api is on'});
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;