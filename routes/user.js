const express = require('express')
const router = express.Router()    //This line creates a new instance of an Express router. Router is a middleware and routng sysytem in express 
const { showSignUp, loginPage, doSignUp, doLogin, getHomePage, detailedView,logout, createBlog, addBlogData } = require('../controllers/userController')
const userAuth = require('../middleware/userAuth')
// const { createBlog } = require('../controllers/adminController')


router.get('/' ,  loginPage )
router.get('/signup', showSignUp )
router.post('/register',  doSignUp)
router.post('/login' , doLogin)
router.get('/home',userAuth, getHomePage)
router.get('/detailedView', userAuth , detailedView)
router.get('/logout' , logout )
router.get('/createBlog' ,userAuth, createBlog)
router.post('/createBlog', userAuth, addBlogData)


module.exports = router