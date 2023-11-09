require('dotenv').config()
const cloudinary = require('cloudinary').v2
const Post = require('../models/post.js')

//Share post to community
const sharePost = async(req, res)=>{
    try {
        const { prompt, photo, userID, firstName } = req.body
        cloudinary.config({
            cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
            api_key : process.env.CLOUDINARY_API_KEY,
            api_secret : process.env.CLOUDINARY_API_SECRET,
        })
        const photoUrl = await cloudinary.uploader.upload(photo)
        const newPost = await Post.create({
            image : photoUrl.url,
            prompt,
            userID,
            firstName
        })
        res.status(200).json({success:true, data : newPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success : false, error : error})
    }
}

//Fetch all posts
const fetchPost = async(req,res) =>{

}

module.exports = { sharePost, fetchPost }