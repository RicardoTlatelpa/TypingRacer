const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    local : {
        email: String,
        password: String
    },
    google: {
        googleID: String, 
        email: String, 
        name: String
    }    
})

const User = mongoose.model('user', userSchema)

module.exports = User;

