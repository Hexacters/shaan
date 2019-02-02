"use strict";

var con = require('./connection');
var users = require('./userSchema');

function getAllUsers(collectionName) {
	con.on('open', ()=> {});

	return users.find({}, function(err, data) { 
		if(err){
			return null;
		}
		con.close();
		return data;
	});

}

module.exports = getAllUsers;


