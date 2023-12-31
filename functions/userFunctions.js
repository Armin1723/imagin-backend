require('dotenv').config()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const Post = require('../models/post')

//Login 
const login = async (req, res) =>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(500).json({error:"Invalid email"});
        }
        const comparedPass = await bcrypt.compare(req.body.password , user.password)
        if(comparedPass){
            if(!user.emailVerified){
                return res.status(400).json({error:"Verify your e-mail."})
            }else{
                const data = {
                    id : user._id,
                    email : user.email,
                    name : user.firstName
                }
                const authToken = jwt.sign(data, process.env.JWT_SECRET)
                return res.status(200).json({msg:"connected",success: true, authToken : authToken})
            }
        }else   
            return res.status(500).json({error:"Wrong password."})
    }catch(err){
        console.log(err)
        res.status(400).json({msg:"Some error occured."})
    }  
}

//Signup
const signup = async (req,res) =>{
    try {
        const { firstName, lastName, dateOfBirth, email, password, mobile } = req.body
        const user = await User.findOne({email : req.body.email})
        if(user){
            return res.status(400).json({msg:"Email Already Registered.", error:true})
        }
        const salt = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: securePassword,
            dateOfBirth,
            mobile,
        })

        //Verifying E-mail
        sendMail(firstName, email, newUser._id)
        res.status(200).json({msg:"Verify your Email",success : true})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Some error occured"})
    }
}

//Verify remaining part of mail verification
const verifyMail = async ( req, res ) =>{
    try {
        const updateInfo = await User.updateOne({_id : req.query.id},{$set : {emailVerified : true}})
        res.redirect('https://imagin.onrender.com')
    } catch (error) {
        res.status(500).json({error:"Error Occured" })
    }
}

//Fetch a user
const fetchUser = async (req, res) =>{ 
    try {
        const user = await User.findOne({_id : req.body.id})
        if(!user)
            return res.status(400).json({error : true, message : "User not found"})
        const tempUser = {
            firstName : user.firstName,
            lastName : user.lastName,
            id : user._id,
            email : user.email,
            mobile : user.mobile,
            dateOfBirth : user.dateOfBirth,
        }
        res.status(200).json({error: false, user : tempUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:true, message:error.message })
    }
}

const fetchPosts = async(req, res)=>{
    const userId = req.body.userId
    try {
        const posts = await Post.find({userID : userId})
        if(!posts)
            return res.status(400).json({error : true, message : "No posts found"})
        res.status(200).json({error : false, posts : posts})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:true, message:error.message })
    }
}

module.exports = { login, signup, verifyMail, fetchUser, fetchPosts }