var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var LandingPageRouter = require('./routes/LandingPage');
var projectsPageRouter = require('./routes/Projects');

var AppPageRouter = require('./routes/AppPage');
var postRouter = require('./routes/Posts');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({extended:false}));  
// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(80);


app.use('/', LandingPageRouter);
app.use('/projects',projectsPageRouter);
app.use('/blog',postRouter);
app.use('/app',AppPageRouter);
mongoose.connect('mongodb://mongoroot:mongo1221@localhost:27017/PostDataBase?authSource=admin', {useNewUrlParser: true,useUnifiedTopology: true},()=>console.log("conected to db"));

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
  res.send(err);
});
module.exports = app;
