var express = require('express');
const router = express.Router();
var path = require('path');
const postSchema = require('./../models/postSchema');   
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');
const { Console } = require('console');

router.get('/', function(req, res, next) 
{
    res.sendFile(path.join(__dirname + '/../public/html/BlogPosts.html'));
});

var storage = multer.diskStorage(
    {destination: function(req,file,cb)
    {
        cb(null,'public/images/uploads/')
    },
    filename: function(req,file,cb)
    {
        let fileExt = file.mimetype.split("/")[1];
        let randomName = crypto.randomBytes(10).toString("hex");
        cb(null,`${randomName}.${fileExt}`);

    }
});
var uploader = multer({storage:storage});
router.get('/createpostpage', function(req, res, next) 
{
  res.sendFile(path.join(__dirname + '/../public/html/CreatePost.html'));
});
router.post('/createpostaction',uploader.single('pictureValue'),async function(request,response,next)
{
    try
    {
        let fileAsThumbnail = `thumbnail-${request.file.filename}`;
        var post = new postSchema({
            title:request.titleValue,
            description:request.descriptionValue,
            photoPath:fileAsThumbnail    
        })
        post = await post.save();
    }
    catch(exception){

    }
    response.redirect('/blog');
});
router.get('/getRecentPosts',async function(req,res,next)
{
    
    try
    {
        var recentposts= await postSchema.find({});
        console.log(recentposts);
        var jsondata=json(recentposts);
        console.log(jsondata);
    }
    catch(exception)
    {
        res.send("error");
    }
    
    res.send("jsondata");    
});
module.exports =router;