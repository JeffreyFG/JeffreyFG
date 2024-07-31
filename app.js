//Imports
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const fs = require('fs');
require('dotenv').config();
const cors = require("cors");

//Routes
const LandingPageRouter = require('./routes/LandingPage');
const projectsPageRouter = require('./routes/Projects');
const AppPageRouter = require('./routes/AppPage');
const postRouter = require('./routes/Posts');
const app = express();
app.enable('trust proxy')

var PORT = 3000
console.log("server activated visit http://localhost:${PORT}/ , or https://jeffreyfg.net");
app.listen(PORT, function(err)
{
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);

});

const hostname = "jeffreyfg.net";



app.use(express.urlencoded({extended:false}));  
app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


//setting up routes
app.use('/', LandingPageRouter);
app.use('/projects',projectsPageRouter);
app.use('/blog',postRouter);
app.use('/app/*',AppPageRouter);
//Database connection
var options = {
  user:process.env.COLLECTION_USER,
  pass:process.env.COLLECTION_USER_PASSWORD,
  useNewUrlParser: true,useUnifiedTopology: true,
};
mongoose.connect(process.env.DB_CONNECTION,options);
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
