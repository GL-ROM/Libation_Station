
const express = require('express');
const user = express.Router();

// Model
const Users = require('../models/users.js');

// user log in route
user.get('/login', (req, res) => {
    res.json('Login' )
})

// handling user login request
user.post('/login', (req, res) => {
    Users.findOne({email: req.body.email}, (err, foundUser) => {
        if (foundUser && foundUser.password === req.body.password) {
            foundUser.loggedIn = true;
            res.redirect('/drinks')
        }else {
            res.json('Login', {errorMessage: 'Incorrect Email or Password'})
        }
    })
})

module.exports = user;