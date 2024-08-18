import mongoose from "mongoose";

interface PostDocument extends mongoose.Document {
  title: string;
  description: string;
  date: Date;
  photoPath: string;
}
const schemaForPosts = new mongoose.Schema<PostDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  photoPath: {
    type: String,
    required: true,
  } /*
    gpslocation:
    {
        type:String,
        required:true
    }*/,
});

export default mongoose.model<PostDocument>("blogData", schemaForPosts);
//module.exports =  mongoose.model('blogData',schemaForPosts);// this name is responsable for creating the name in the data base.
