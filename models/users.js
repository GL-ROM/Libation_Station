
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema ({
    name: String,
    email: String,
    password: String,
    dob: String,
    loggedIn: { type:Boolean, default:false },
    favorites: []
},{ timestamps: true });

const Users = mongoose.model('User', userSchema)

module.exports = Users;