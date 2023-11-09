const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        length : 20
    },
    lastName:{
        type : String,
        required : true,
        length : 20
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true,
    },
    dateOfBirth:{
        type : String,
        required : true
    },
    mobile:{
        type : Number,
        required : true
    },
    emailVerified:{
        type : Boolean,
        default : false
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User