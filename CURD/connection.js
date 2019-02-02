"use strict";

var mongoose = require('mongoose');
var mongoDB = 'mongodb://root:admin123@ds117545.mlab.com:17545/hexa';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var con = mongoose.connection;
con.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = con;