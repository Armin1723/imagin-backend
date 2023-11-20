require('dotenv').config()
const cloudinary = require('cloudinary')
const Post = require('../models/post')

//Save post 
const savePost = async(req, res)=>{
    try {
        const { prompt, image, userID, username } = req.body
        const post = await Post.findOne({prompt : prompt})
        if(post){
            return res.status(200).json({success:true, message : "Image already exists." , postID : newPost._id})
        }
        cloudinary.v2.config({
            cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
            api_key : process.env.CLOUDINARY_API_KEY,
            api_secret : process.env.CLOUDINARY_API_SECRET,
            secure:true
        })
        const photoUrl = await cloudinary.v2.uploader.upload(image, {timeout:120000})
        const newPost = await Post.create({
            image : photoUrl.url,
            userID,
            prompt,
            username
        })
        res.status(200).json({success:true, message : "Image generated.", postID : newPost._id})
    } catch (error) {
        res.status(500).json({success : false, message : error})
    }
}

//Share post to community.
const sharePost = async (req,res)=>{
    try {
        const { postID } = req.body
        const tempPost = await Post.findOne({_id : postID})
        if(tempPost.shared)
            return res.status(200).json({error: false, message : "Already shared."})
        else{ 
            await Post.updateOne({_id : postID}, {$set : {shared : true}})
            res.status(200).json({error: false, message : "Shared to community."})
        }
    } catch (err) {
        res.status(500).json({error:true, message : err})
    }
}

//Fetch all posts
const fetchPost = async(req,res) =>{
    try {
        const posts = await Post.find({shared : true})
        res.status(200).json({error: false, posts : posts})
    } catch (err) {
        res.status(500).json({error: true, message: err})
    }
}

module.exports = { savePost, fetchPost, sharePost }