//Imports
import express from "express";
import { authRouter } from "./routes/auth.route";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRouter from "./routes/Posts";
import * as dotenv from "dotenv";
const cors = require("cors");

dotenv.config();
const app = express();
const serverPort: string = process.env.PORT ?? "3000";

const hostname = "jeffreyfg.net";

app.use(express.urlencoded({ extended: false }));
//  app.use(fileUpload("../"));

app.use(bodyParser.json());
app.use(express.json());
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.listen(serverPort, function () {
  console.log("Server listening on Port", serverPort);
});

//setting up routes
//app.enable('trust proxy')
app.use("/api/auth", authRouter);
app.use("/api/blog", postRouter);
app.use(
  cors({
    origin: ["https://JeffreyFG.net"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.json());
//Database connection
let connectionString = process.env.DB_CONNECTION;
var options: mongoose.ConnectOptions = {
  user: process.env.COLLECTION_USER,
  pass: process.env.COLLECTION_USER_PASSWORD,
};
if (connectionString != null) {
  mongoose.connect(connectionString, options);
  const db = mongoose.connection;
  db.once("open", function () {
    console.log("connected to the database");
  });
}

// catch 404 and forward to error handler
app.use(function (requestArgument: Express.Request, responseArgument: express.Response) {
  responseArgument.status(404).sendFile("./public/html/Error.html");
});

module.exports = app;
