
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema ({
    username: String,
    email: String,
    password: String,
    loggedIn: { type:Boolean, default:false }
}, { timestamps: true });

const Users = mongoose.model('User', userSchema)

module.exports = Users;