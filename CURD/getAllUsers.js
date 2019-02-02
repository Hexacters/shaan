"use strict";

var con = require('./connection');
var users = require('./userSchema');

function getAllUsers(collectionName, name) {

	var query = {};
	if(name) {
		query = {
			name : name
		} 
	}
	con.on('open', ()=> {});

	return users.find(query, function(err, data) { 
		if(err){
			return null;
		}
		con.close();
		return data;
	});

}

module.exports = getAllUsers;


