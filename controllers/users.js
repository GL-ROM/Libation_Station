
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
<<<<<<< HEAD
        } else {
=======
        }else {
>>>>>>> f9593f9e346850df249938ae4d23c338e13053ac
            res.json('Login', {errorMessage: 'Incorrect Email or Password'})
        }
    })
})

module.export = user;