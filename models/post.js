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
    firstName : {
        type : String,
        required : true
    }
})

const Post = new mongoose.model('Post', postSchema)
module.exports = Post