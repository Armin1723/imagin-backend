require('dotenv').config()
const mongoose = require('mongoose')

const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_DB_URI,{
        dbName: 'atlas-database'
    }).then(()=>{console.log("DB connected")}).catch(err => console.log(err))
}

module.exports = dbConnection