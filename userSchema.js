"use strict";

var mongoose = require('mongoose');
var userData = mongoose.Schema({
    name : { type: String, required: true, trim: true },
    amount : { type: String, trim: true }
});

var user = mongoose.model('user', userData, 'EnglishFine');
module.exports = user;