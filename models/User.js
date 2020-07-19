const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    email: String,
    googleID: String
})

module.exports = User;