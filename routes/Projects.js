var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.sendFile(path.join(__dirname + '/../public/html/Projects.html'));
});/*
router.get('/getprojects',getprojects);

function getprojects(request,response,next)
{


  response.send("this is test data")
}
*/
module.exports = router;
