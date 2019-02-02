"use strict";

var con = require('./connection');
function getAllUsers(collectionName){

	con.once('open', ()=> {	
		con.db.collection(collectionName, function(err, collection){
			collection.find().toArray(function(err, data){
			    console.log(data); 
			    con.close();
			});
		});
	});

}

module.exports = getAllUsers;


