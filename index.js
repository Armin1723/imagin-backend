require('dotenv').config()
const express = require('express')
const dbConnection = require('./db.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const app = express()

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 24 hrs in milliseconds
  max: 10,
  message: 'You have exceeded the 5 requests in 1 min limit!', 
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json())
app.use(rateLimiter)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// Database Connection
dbConnection()

//Routes
app.use('/api/user',require('./routes/user.js'));
app.use('/api/post',require('./routes/post.js'));


//Starting the server
try{
    app.listen(process.env.PORT,()=>{
        console.log("server is working")
    })
}
catch(err){
    console.log(err)
}
