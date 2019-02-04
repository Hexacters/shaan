"use strict";

var con = require('./connection');
var users = require('./userSchema');

function getAllUsers(collectionName, name) {
	console.log(collectionName, "Get Users");
	var query = {};
	if(name) {
		query = {
			name : name
		} 
	}
	console.log(query);
	con.on('open', ()=> {});

	return users.find(query, function(err, data) { 
		if(err){
			return null;
		}
		console.log('cloase con');
		return data;
	});

}

module.exports = getAllUsers;


