//Imports
import express from "express";
import authRouter from "./routes/auth.route";
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');


require('dotenv').config();


//Routes
const postRouter = require('./routes/Posts');

const app = express();
app.enable('trust proxy')

var PORT = 3000
console.log("server activated visit http://localhost:3000/ , or https://jeffreyfg.net");
app.listen(PORT).on("error",function(error:String)
{
  if (error) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);

});

const hostname = "jeffreyfg.net";



app.use(express.urlencoded({extended:false}));  
app.use(fileUpload());

app.use(bodyParser.json());
app.use(express.json());
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


//setting up routes
app.use('/api/blog',postRouter);
app.use("/api/login/",authRouter);

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
app.use(function(requestArgument:Express.Request, responseArgument:express.Response) 
{
  responseArgument.status(404).sendFile('./public/html/Error.html');
});


module.exports = app;

