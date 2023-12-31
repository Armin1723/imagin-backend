const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    userID : {
        type : String,
        required : true
    },
    prompt : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    shared :{
        type: Boolean,
        default : false
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post