const express = require('express');
const router = express.Router();

// Model
const Drinks = require('../models/drinks.js');
const Users = require('../models/users.js');


router.get('/', (req, res) => {
    Drinks.find({}, (err, foundDrinks) => {
        res.json(foundDrinks);
    });
});

router.post('/', (req, res) => {
    Drinks.create(req.body, (err, createDrink) => {
        res.json(createDrink);
    })
});

// user log in route
router.get('/login', (req, res) => {
    res.json('Login' )
})

// Route to POST/Add user to DB
router.post('/user', (req, res) => {
    // console.log("Body:", req.body)
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob
    };

    console.log(newUser);
    // code to send newUser object to database for storage.
    Users.create(newUser, (error, createdUser) => {
        // Once created - respond to client
        console.log(createdUser)});
})

// handling user login request
router.post('/login', (req, res) => {
    Users.findOne({email: req.body.email}, (err, foundUser) => {
        if (foundUser && foundUser.password === req.body.password) {
            foundUser.loggedIn = true;
            res.redirect('/drinks')
        }else {
            res.json('Login', {errorMessage: 'Incorrect Email or Password'})
        }
    })
})

module.exports = router;