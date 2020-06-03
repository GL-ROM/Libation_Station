
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema ({
    name: String,
    email: String,
    password: String,
    dob: Date,
    loggedIn: { type:Boolean, default:false },
},{ timestamps: true });

const Users = mongoose.model('User', userSchema)

module.exports = Users;