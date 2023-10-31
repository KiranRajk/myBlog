const express = require('express')
const router = express.Router( )
const {uploadPage, createBlog, homePage, viewPage, deletePost} = require('../controllers/adminController')


router.get('/' , homePage )
router.get('/uploads', uploadPage)
router.post('/createBlog' , createBlog)
router.get('/viewPage', viewPage )
router.delete('/deletePost' , deletePost)
module.exports = router  //if this is not given app.js can't access the above routes