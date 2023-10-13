const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    heading : {
        type : String,
        required : true,
        default : "No Heading"
    },
    createdAt : {
        type : Date,
        default : new Date( ),
    } ,
    content : {
        type : String,
        required : true,
    },
    images : [ ],

})

const blogs = mongoose.model('blogs' , blogSchema)  //blogs is collection name, this model used for CRUD operations

module.exports = blogs