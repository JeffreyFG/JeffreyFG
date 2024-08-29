import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
  email: string;
  picture: string;
  firstName: string;
  lastName: string;
}

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  tokenString:{
    type:String,
    required:true,
  },
  tokenCreationDate:
  {
    type:Date,
    required:true
  }
});
//#export default  mongoose.model('blogData',schemaForPosts);
export default mongoose.model<UserDocument>("User", UserSchema);
