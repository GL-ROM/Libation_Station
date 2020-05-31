const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
    description: String,
});

const Drinks = mongoose.model("Drink", drinkSchema);

module.exports = Drinks;