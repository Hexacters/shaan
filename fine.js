"use strict";

var users = require('./userSchema');
var getAllUsers = require('./getAllUsers');
var addOrUpdateUser = require('./addOrUpdateUser');
var removeUser = require('./deleteUser');


	
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


