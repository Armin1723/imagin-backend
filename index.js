require('dotenv').config()
const express = require('express')
const dbConnection = require('./db.js')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(express.json())
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
