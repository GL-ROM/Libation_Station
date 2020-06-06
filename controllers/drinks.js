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

router.get('/:id', (req,res) => {
    Users.findById(req.params.id, (err, data) => {
        res.json(data)
    })
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
//create drink
router.post('/', (req, res) => {
    console.log('body',req.body)
    for(let i = 0; i < 15; i++) {
        req.body[`strIngredient${i + 1}`] = req.body.strIngredient[i];
        req.body[`strMeasure${i + 1}`] = req.body.strMeasure[i];
    }
    req.body.ingredientsArray = req.body.strIngredient
    Drinks.create(req.body, (err, createDrink) => {
        Drinks.findByIdAndUpdate(createDrink._id, {idDrink: createDrink._id}, (err, data) => {
            res.json(createDrink)
        })
    })
});
// handling user login request
router.post('/login', (req, res) => {
    console.log("this is req.body: ", req.body);
    Users.findOne({email: req.body.email}, (err, foundUser) => {
        if (foundUser && foundUser.password === req.body.password) {
            foundUser.loggedIn = true;
            console.log("You have signed in");
            res.json(foundUser)
        }else {
            res.json('Login', {errorMessage: 'Incorrect Email or Password'})
        }
    })
})

//adding to favorites
router.put('/:userID/:action', (req, res) => {
    if(req.params.action === 'add') {
        console.log('userID', req.params.userID)
        console.log('req.body-=-', req.body)
        Users.findByIdAndUpdate(req.params.userID, {$push: {favorites: req.body}}, (err, data) => {
            console.log('---', data)
            res.json(data)
        })
    } else {
        Users.findByIdAndUpdate(req.params.userID, {$pull: {favorites: req.body}}, (err, data) => {
            res.json(data)
        })
    }
})

//searching through user drinks
router.get('/:category/:value', (req, res) => {
    console.log(req.params.category)
    switch(req.params.category) {
        case 'g':
            Drinks.find({strGlass: req.params.category}, (err, data) => {
                res.json(data)
            });
            break;
        case 'c':
            console.log('c evaluated', `category is ${req.params.category}`)
            Drinks.find({strCategory: req.params.value}, (err, data) => {
                res.json(data);
            });
            break;
        case 'i':
            let valArr = req.params.value.split(',')
            for(let i = 0; i < valArr.length; i++) {
                valArr[i] = valArr[i].toLowerCase();
                console.log(valArr)
            }
            
            Drinks.find({ingredientsArray: {$all: valArr}}, (err, data) => {
                console.log(data)
                res.json(data)
            })
    }
})

module.exports = router;