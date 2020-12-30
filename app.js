var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var LandingPageRouter = require('./routes/LandingPage');
var projectsPageRouter = require('./routes/Projects');
var BlogPostsRouter = require('./routes/BlogPosts');
var AppPageRouter = require('./routes/AppPage');
var CreatePostRouter = require('./routes/CreatePost');

const app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);


app.use('/', LandingPageRouter);
app.use('/projects',projectsPageRouter);
app.use('/blog',BlogPostsRouter);
app.use('/app',AppPageRouter);
app.use('/createpost',CreatePostRouter);


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
