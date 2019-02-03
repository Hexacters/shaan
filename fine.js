"use strict";

var users = require('./CURD/userSchema');
var getAllUsers = require('./CURD/getAllUsers');
var addOrUpdateUser = require('./CURD/addOrUpdateUser');
var removeUser = require('./CURD/deleteUser');
var updateUserEntity = require('./updateEntity');

var con = require('./CURD/connection');

function Fine (bot) {
	var speech = '';
	if (bot) {
		if (bot.process == 'Add') {
		  if (bot.amount) {
		    if (bot.users.length) {
		    console.log(bot.users);
		      for (var key in bot.users) {
		        return addOrUpdateUser(new users({
		            name: bot.users[key],
		            amount: bot.amount
		        })).then(function (res) {
		            speech = bot.users[0] + " Added Successfully";
		            return speech;
		        });
		      }
		    } else {
		    	return "Please mention Their name :(";
		    }
		  } else {
		  	if (bot.Users) {
		  		return updateUserEntity(bot.Users).then(function (response) {
					return bot.Users + " Added Successfully :)";
				});
		  	} else {
		  		speech = "Please mention Their name :(";
		    	return speech;
		  	}
		  }
		} else if (bot.process == 'Get') {
			return getAllUsers("EnglishFine", bot.users).then(function(res) {
				var data = res;
				console.log(data);
				var total = 0;
				con.close();
				for (var key in data) {
					total = total + parseInt(data[key].amount); 
				}
				return bot.users ? "Total about for " + bot.users + " is " + total : "Total amount is :" + total;
			});
				
		} else if (bot.process == 'Remove') {
			return removeUser(bot.users).then(function (res) {
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
/* getAllUsers("EnglishFine").then(function(res){
 	console.log(res);
 });*/	

// updateUserEntity("Venkat").then(function (response) {
// 	console.log(response);
// });
