var express = require('express');
const router = express.Router();
var path = require('path');
const Post= require('./../models/postSchema');   
const sharp = require('sharp');
const crypto = require('crypto');
const { Console } = require('console');
const fileUpload = require('express-fileupload');


router.get('/', function(req, res, next) 
{
    res.sendFile(path.join(__dirname + '/../public/html/BlogPosts.html'));
});
router.get('/imagePost/:id',function(req,res,next)
{
   
    res.sendFile("imagePost.html",{root:'public/html'});
});

router.get('/createpostpage', function(req, res, next) 
{
  res.sendFile(path.join(__dirname + '/../public/html/CreatePost.html'));
});
router.post('/createpostaction',async function(request,response,next)
    {
        if(request.body.passwordValue==process.env.password)
        {
            
            let pathArray=request.file.path.split("/");
            let fileAsThumbnail = pathArray[pathArray.length-1];
            let post = new Post({
                title:request.body.titleValue,
                description:request.body.descriptionValue,
                photoPath:fileAsThumbnail});
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
        //console.log(recentposts);
        response.json(recentposts);

    }
    catch(exception)
    {
        response.send("error");
        console.log(exception);
    }
});

router.get('/getImageByID/:id',async function(request, response, next)
{
    
    try
    {
        let _id = request.params.id;
        console.log(_id);
        postForID = await Post.find({_id:_id});
        response.json(postForID);
    }
    catch(e)
    {
        console.log("error: "+e);
    }
  
});

module.exports =router;
