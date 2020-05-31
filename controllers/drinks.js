const express = require('express');
const router = express.Router();

// Model
const Drinks = require('../models/drinks.js');

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


module.exports = router;