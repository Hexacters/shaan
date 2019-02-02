"use strict";

var mongoose = require('mongoose');
var con = require('./connection');
var users = require('./userSchema');

function removeUser(name) {
	con.on('open', ()=> {});
	return users.deleteOne({ name: name }, function(err, data) {
	    if (!err) {
	          return name + " Was removed Successfully \n";
	    }
	    else {
	           console.log(err.errmsg);
	    }
	});
	
}

module.exports = removeUser;