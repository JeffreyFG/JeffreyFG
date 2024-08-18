import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const router = express.Router();

import Post from "../models/postSchema";
import multer from "multer";

import sharp from "sharp";
import crypto from "crypto";
//const PostModel = mongoose.model("Post",schemaForPosts);
var storage = multer.diskStorage({
  destination: function (request: Express.Request, file, cb) {
    cb(null, "public/images/uploads/");
  },
  filename: function (req, file, cb) {
    let fileExt = file.mimetype.split("/")[1];
    let randomName = crypto.randomBytes(10).toString("hex");
    cb(null, `${randomName}.${fileExt}`);
  },
});
var uploader = multer({ storage: storage });
router.post(
  "/createPostAction",
  uploader.single("pictureValue"),
  function (request: express.Request, response: express.Response) {
    const tokenHeaderKey = "jwt-token";
    const jwtSecretKey: String = new String(process.env.DIY_JWT_SECRET);
    const token: String = new String(request.headers[tokenHeaderKey]);
    try {
      const verified = jwt.verify(token.toString(), jwtSecretKey.toString());
      if (verified) {
        if (request && request.file) {
          const pathArray: String[] = request.file.filename.split("/");
          const fileAsThumbnail: String = pathArray[pathArray.length - 1];

          const post = new Post({
            title: request.body.titleValue,
            description: request.body.descriptionValue,
            photoPath: fileAsThumbnail,
          });
          console.log("before saving");
          try {
            const newPost = post.save();
            response.status(201).redirect("/blog");
          } catch (err) {
            response.status(400);
            console.log("error in creating post");
            console.log(err);
          }
        }

        return response
          .status(200)
          .json({ safehouseKey: "under-the-doormat", message: "success" })
          .redirect("/blog");
      } else {
        // Access Denied
        return response.status(401).json({ message: "error" });
      }
    } catch (error) {
      // Access Denied
      return response.status(401).json({ message: "error" });
    }
  }
);
router.get("/getRecentPosts", async function (request, response, next) {
  try {
    var recentposts = await Post.find();
    response.json(recentposts);
  } catch (exception) {
    response.send("error");
    console.log(exception);
  }
});

router.get("/getImageByID/:id", async function (request, response, next) {
  try {
    let _id = request.params.id;
    console.log(_id);
    const postForID = await Post.find({ _id: _id });
    response.json(postForID);
  } catch (e) {
    console.log("error: " + e);
  }
});

export default router;
