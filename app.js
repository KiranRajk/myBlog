const express = require('express')    // import express framework to our project
const app = express( )   //create a new instance of express
const path = require('path')
const hbs = require( 'hbs' )  
const users = require('./routes/user')
const admin = require('./routes/admin')   // admin is a local module so we have to mention its path inside the paranthesis 
const connectDB = require( './config/dbConfig' )  //require the local module into the main page
const cookieParser = require('cookie-parser')   //parse cookie
require('dotenv').config()


app.set('view engine' , 'hbs')  
app.set('views' ,path.join(__dirname , "pages") )     //views is a setting key. It tells the express.js where to look for view templates
 
app.use(express.static(path.join(__dirname , "public")))    //express.static is a builtin middleware function in expressjs. It is used in an express app to serve static files(css,html,images video etc) 
app.use(express.urlencoded( {extended : true} ) )    // use the body-parser middleware for post requests. To decode encrypt data from client post data
app.use(express.json())  //use this middleware, prorper convert data to json format helps in our fetch request 
app.use(cookieParser())

app.use('/', (req, res, next) => {
    res.set("Cache-Control" , 'no-store')
    next()
})




connectDB( ) //calling the function here to get DB 


app.use('/' , users)
app.use('/admin', admin)



app.listen( process.env.PORT )