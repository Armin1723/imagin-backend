const sendMail = async (username, email, id) =>{
    require('dotenv').config()
    const nodemailer = require('nodemailer')
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure: false,
            requireTLS : true,
            auth : {
                user:'letsimagin.handler@gmail.com',
                pass: process.env.EMAIL_PASSWORD 
            }
        })
        
        const mailOptions = {
            from : 'letsimagin.handler@gmail.com',
            to : email,
            subject : "Verification mail for iMAGIN",
            html : '<p>Hi '+username+' welcome to iMAGIN. As last part of the verification step kindly click on <a href="https://imagin-backend.onrender.com/api/user/verify?id='+id+'">here</a>'
        }
    
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error)
            }else{
                console.log('Email has been sent -',info.response)
            }
        })
    } catch (err) {
        console.log(error)
    }
}

module.exports = sendMail
