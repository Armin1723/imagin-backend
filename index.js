require('dotenv').config()
const express = require('express')
const dbConnection = require('./db.js')
// const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

 app.use(express.json({limit: '50mb'}));
 app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
 app.use(cors())

// Database Connection
dbConnection()

//Routes
app.get('/',(req,res)=>{
   res.status(200).json({
    message : "Welcome to imagin-backend"
   }) 
})
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
