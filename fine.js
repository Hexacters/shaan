"use strict";

var users = require('./CURD/userSchema');
var getAllUsers = require('./CURD/getAllUsers');
var addOrUpdateUser = require('./CURD/addOrUpdateUser');
var removeUser = require('./CURD/deleteUser');
var updateUserEntity = require('./updateEntity');

function Fine (bot) {
	var speech = '';
	if (bot) {
		if (bot.process == 'Add') {
		  if (bot.amount) {
		    if (bot.users.length) {
		      for (key in bot.users) {
		        addOrUpdateUser(new users({
		            name: bot.users[key],
		            amount: bot.amount
		        })).then(function (res) {
		            speech = bot.user[key] + "Added Successfully";
		            return speech;
		        });
		      }
		    } else {
		    	return "Please mention Their name :(";
		    }
		  } else {
		  	if (bot.users) {
		  		updateUserEntity(bot.users).then(function (response) {
					return bot.users + "added Successfully :)"
				});
		  	} else {
		  		speech = "Please mention Their name :(";
		    	return speech;
		  	}
		  }
		} else if (bot.process == 'Get') {
			getAllUsers("EnglishFine", bot.users).then(function(res) {
				var data = res;
				var total = 0;
				for (key in data) {
					total = total + data[key].amount; 
				}
				return bot.users ? "Total about for " + bot.users + " is " + total : "Total amount is :" + total;
			});
				
		} else if (bot.process == 'Remove') {
			removeUser(bot.users).then(function (res) {
				if(res) {
					return bot.users + "Deleted Success fully \n";
				}
			});
		} else {
			return "Sorry I don't Understand ;(";
		}
	}
}
	
module.exports = Fine;
// addOrUpdateUser(new users({
// 		name: "Vicky",
// 		amount: "10"
// })).then(function (res) {
// 		console.log(res.name + "Inserted Success Fully \n");
// });
// removeUser('Nancy').then(function (res) {
// 	if(res) {
// 		console.log("Deleted Success fully \n");
// 	}
// });
// getAllUsers("EnglishFine").then(function(res){
// 	console.log(res);
// });	

// updateUserEntity("Venkat").then(function (response) {
// 	console.log(response);
// });
