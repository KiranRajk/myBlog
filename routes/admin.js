const express = require('express')
const router = express.Router( )
const {uploadPage, createBlog} = require('../controllers/adminController')

router.get('/' , (req, res) => {
    res.send('Hi This is the admin page')
})

router.get('/uploads', uploadPage)
router.post('/createBlog' , createBlog) 

module.exports = router  //if this is not given app.js can't access the above routes