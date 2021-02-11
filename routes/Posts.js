var express = require('express');
const router = express.Router();
var path = require('path');
const Post= require('./../models/postSchema');   
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
        if(request.body.passwordValue==process.env.password)
        {
            let pathArray=request.file.path.split("/");
        let fileAsThumbnail = pathArray[pathArray.length-1];

        console.log("value of title: "+request.body.titleValue);
        console.log("value of thumbnail: "+fileAsThumbnail);
        console.log(request.body);
        console.log("before creation of post");
        let post = new Post({
            title:request.body.titleValue,
            description:request.body.descriptionValue,
            photoPath:fileAsThumbnail    
        });
        console.log("before saving");
        try
        {
            const newPost =post.save()
            response.status(201).redirect('/blog');
        }
        catch(err)
        {
            response.status(400);
            console.log("error in creating post");
            console.log(err);
        }
        }
        else
        {
            response.send("Error wrong password");
        }
        
});
router.get('/getRecentPosts',async function(request,response,next)
{
    try
    {
        var recentposts= await Post.find();
        console.log(recentposts);
        response.json(recentposts);

    }
    catch(exception)
    {
        response.send("error");
        console.log(exception);
    }
});
module.exports =router;
