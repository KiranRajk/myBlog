const { response } = require('express');
const mongoose = require('mongoose');
const USER = require('../models/usersModel').users;
const BLOGS = require('../models/blogSchema');
const jwt = require('jsonwebtoken'); 
const multer = require('multer')

const loginPage = (req, res) => {
    if(req.cookies.userJwt){
        res.redirect('/home')
    }
    else{
    res.render('user/login.hbs')
    }
} 

const showSignUp = (req , res) => {
    res.render('user/signup.hbs')
}

const doSignUp = (req,res) =>{
    console.log(req.body);

    USER({
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
    }).save( )
    .then( (res) =>{
        res.json({signup : true});
    } )
    .catch( ( ) =>{
        res.json({signup : false});
    } )
}


const doLogin = (req, res) =>{
    USER.find( {email : req.body.email , 
                        password : req.body.password }).then( (response) =>{
                            if(response.length > 0){
                                const token = jwt.sign({userID : response[0]._id},"secretkey", {expiresIn : '2d'})

                                res.cookie('userJwt', token, {
                                    httpOnly : true,
                                    sameSite : 'lax',
                                    secure : false,
                                    maxAge : 24*60*60*1000,
                                })
                                res.status(200).json({login : true});
                            }
                            else{
                                res.json({login : false});
                            } 
                        })
}

const getHomePage = (req,res) => {
    BLOGS.find().then((response) => {
        res.render('user/home.hbs', {data : response})
    } )
}

const detailedView = (req, res) => {
    BLOGS.find({_id : req.query.id}).populate({
        path:"createdBy", select : ['username' , 'email'] }).then((response) => {
        console.log(response);
        res.render('user/detailedView.hbs' , {data : response [0]})
    })
}

const logout = (req, res) =>{
    res.cookie('userJwt',null, {
        httpOnly : true,
        sameSite : 'lax',
        secure : false,
        maxAge : 1
    })
    req.cookies.userJwt = null
    res.redirect('/')
}

const createBlog= (req, res) => {
    res.render('user/userUpload.hbs')
}

const addBlogData = (req, res) => {
    const fileStorage = multer.diskStorage({
        destination:(req,file, callback) => {
            callback(null, "public/uploads")
        },
        filename: (req,files,cb) => {
            cb(null, Date.now() + "-" +files.originalname)
        }
    })
    
    const upload = multer({storage:fileStorage}).array('images',4 )  //create a multer instance with defined storage configuration
    
    upload(req,res,(err)=>{
        if(err){
            console.log("File Upload Error");
        }
        else{
           BLOGS({
            heading : req.body.title,
            content : req.body.content ,
            createdBy : req.query.id,
            images : req.files,
           }).save( ).then((response)=>{
                res.redirect("/createBlog")
           })
        }
    })
}

module.exports = { showSignUp, loginPage, doSignUp, doLogin, getHomePage, detailedView, logout, createBlog, addBlogData }    //builtin fn in node.js  // since here is many functions thus its export as an object 

//we dont need to require express.js library here because here we dont use any express module like router, path etc