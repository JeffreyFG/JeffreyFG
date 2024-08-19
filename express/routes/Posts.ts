import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import Post from "../models/postSchema";
import multer from "multer";
import crypto from "crypto";
const router = express.Router();
var storage = multer.diskStorage({
  destination: function (request: Express.Request, file, cb) {
    cb(null, "/dist/images/uploads");
  },
  filename: function (req, file, cb) {
    let fileExt = file.mimetype.split("/")[1];
    let randomName = crypto.randomBytes(10).toString("hex");
    cb(null, `${randomName}.${fileExt}`);
  },
});
function checkFileType(file): boolean {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  return mimetype && extname;
}
const uploader = multer({ storage: storage }).single("file");
router.post("/createPostAction", function (request: express.Request, response: express.Response) {
  const jwtSecretKey: jwt.Secret = process.env.JWT_SECRET!;
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (token && token != "undefined") {
      const verified = jwt.verify(token.toString(), jwtSecretKey);
      if (verified) {
        uploader(request, response, (error) => {
          console.log(request.file);
          if (request && request.file) {
            const fileToSave: Express.Multer.File = request.file;
            const filetypeOk: boolean = checkFileType(fileToSave);
            if (filetypeOk) {
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
              } catch (error) {
                response.status(500).json({ message: "error in creating post: " + error });
              }
            } else {
              return response.status(415).json({ message: "File type not supported" });
            }
          } else {
            return response.status(406).json({ message: "File not present" });
          }
        });
      } else {
        // Access Denied
        return response.status(401).json({ message: "JWT token invalid" });
      }
    }
  } catch (error) {
    // Access Denied
    console.log("error in validation of token " + token + "\n" + error + "\n");
    return response.status(500).json({ message: "error in validation" + error });
  }
});
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
