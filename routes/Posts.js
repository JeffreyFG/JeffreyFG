var express = require('express');
const router = express.Router();
const UserError = require('../helpers/errors/UserError');
const db = require('../conf/database');
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');



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
router.post('/createPost',uploader.single('uploadImage') ,function(req,res,next)
{

    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let desOfThumbnail = req.file.destination+"/"+fileAsThumbnail;
    let title = req.body.title;
    let desc = req.body.description;
    let fk_userid = req.session.userID;
    sharp(fileUploaded).resize(200).toFile(desOfThumbnail).then(function()
    {
        let baseSQl = 'INSERT INTO posts (title,description,photopath,thumbnail,created,fk_userid) VALUE (?,?,?,?,now(),?);'
        console.log(fileUploaded);
        console.log(desOfThumbnail);
        console.log(title); 
        console.log(desc);
        console.log(fk_userid);


        return db.execute(baseSQl,[title, desc,fileAsThumbnail,desOfThumbnail,fk_userid]);
         
        
    }).then(function([results,fields])
    {
        console.log(results.affectedRows);
        if(results&& results.affectedRows)
        {
            db.execute(baseSQl,[title, desc,fileAsThumbnail,desOfThumbnail,fk_userid]);
            res.redirect('/');
            //res.json({status:"ok",message:"post was created","redirect":"/"});

            
        }
        else
        {
            
            res.json({status:"ok",message:"post was not created","redirect":"/postimage"});
            //next(Error('post was not created'));
        }
    }).catch(function(err)
    {
        next(err);
    });
});



    router.get('/getRecentPosts',function(req,res,next)
    {
        let searchTerm = req.params.searchTerm;
        let _sql = 'SELECT p.id, p.title, p.description, FROM posts'
   
        db.query(_sql).then(function([results,fields])
            {
                res.json(results);
            });
    
    
    });

    router.get('/imagepost/:id',function(req,res,next)
    {
            res.sendFile("imagePost.html",{root:'public/html'});
    });
    router.get('/getPostsById/:id',function(req,res,next)
    {
        let _id = req.params.id;
        let _sql = 'SELECT * FROM SchemaForPosts.Posts';
            db.query(_sql).then(function([results,fields])
                {
                    res.json(results[0]);
                }).catch(function(err)
                {
                    next(err);
                });
        



        });

module.exports =router;