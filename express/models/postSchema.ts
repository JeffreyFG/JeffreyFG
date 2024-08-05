import mongoose from "mongoose";


const schemaForPosts = new mongoose.Schema({
    title:{
        type :String,
        required: true
    },
    description:{
        type :String,
        required: true
    },
    date :{
        type:Date,
        default:Date.now
    },
    photoPath:
    {
        type:String,
        required:true
    },/*
    gpslocation:
    {
        type:String,
        required:true
    }*/

})

export default  mongoose.model('blogData',schemaForPosts);
//module.exports =  mongoose.model('blogData',schemaForPosts);// this name is responsable for creating the name in the data base.