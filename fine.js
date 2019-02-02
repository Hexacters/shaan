"use strict";

var users = require('./CURD/userSchema');
var getAllUsers = require('./CURD/getAllUsers');
var addOrUpdateUser = require('./CURD/addOrUpdateUser');
var removeUser = require('./CURD/deleteUser');
var updateUserEntity = require('./updateEntity');


	
addOrUpdateUser(new users({
		name: "Vicky",
		amount: "10"
})).then(function (res) {
		console.log(res.name + "Inserted Success Fully \n");
});
removeUser('Nancy').then(function (res) {
	if(res) {
		console.log("Deleted Success fully \n");
	}
});
getAllUsers("EnglishFine").then(function(res){
	console.log(res);
});	

updateUserEntity("Venkat").then(function (response) {
	console.log(response);
});
