const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email : {
        type : String,
        required: true,
    },
    username : {
        type: String,
        required: true,
    }, 
    password : {
        type: String,
        required: true,  
    }
})

const users = mongoose.model('users' ,userSchema);  //model used to add and perform CRUD operations
module.exports = {users}