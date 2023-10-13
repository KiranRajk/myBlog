const multer = require("multer");
const BLOGS = require("../models/blogSchema");
const { response } = require("express");

const uploadPage = (req,res) => {
    res.render('admin/upload.hbs')
}

const createBlog = (req,res) => {

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
        images : req.files,
       }).save( ).then((response)=>{
            res.redirect("/admin/uploads")
       })
    }
})

}


module.exports= {uploadPage, createBlog}