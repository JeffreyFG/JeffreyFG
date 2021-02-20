const mongoose = require('mongoose');
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
    }

})
module.exports =  mongoose.model('blogData',schemaForPosts);// this name is responsable for creating the name in the data base.