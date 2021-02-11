var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const bodyParser = require('body-parser');

var LandingPageRouter = require('./routes/LandingPage');
var projectsPageRouter = require('./routes/Projects');

var AppPageRouter = require('./routes/AppPage');
var postRouter = require('./routes/Posts');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({extended:false}));  
// view engine setup

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(80);

app.use('/', LandingPageRouter);
app.use('/projects',projectsPageRouter);
app.use('/blog',postRouter);
app.use('/app',AppPageRouter);
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open',function()
{
  console.log("connected to the database");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).sendFile('./public/html/Error.html');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});
module.exports = app;
