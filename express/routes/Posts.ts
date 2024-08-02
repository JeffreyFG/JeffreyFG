import express, { NextFunction } from "express"
import mongoose from 'mongoose';
const router = express.Router();

import schemaForPosts from '../models/postSchema';
import multer from "multer";  

const sharp = require('sharp');
const crypto = require('crypto');
const { Console } = require('console');
const fileUpload = require('express-fileupload');
const PostModel = mongoose.model("Post",schemaForPosts);
var storage = multer.diskStorage(
    {destination: function(request:Express.Request,file,cb)
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
router.post('/createpostaction', uploader.single('pictureValue'),function(request:express.Request,response:express.Response)
    {
        if(request.body.passwordValue==process.env.password)
        {
            if(request&&request.file)
            {
                const pathArray:String[] = request.file.filename.split("/");
                const fileAsThumbnail:String = pathArray[pathArray.length-1];

                

                const post= new PostModel({
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
        } 
});
router.get('/getRecentPosts',async function(request,response,next)
{
    try
    {
        var recentposts= await PostModel.find();
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
        const postForID = await PostModel.find({_id:_id});
        response.json(postForID);
    }
    catch(e)
    {
        console.log("error: "+e);
    }
  
});

module.exports =router;
