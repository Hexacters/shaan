"use strict";

var users = require('./CURD/userSchema');
var getAllUsers = require('./CURD/getAllUsers');
var addOrUpdateUser = require('./CURD/addOrUpdateUser');
var removeUser = require('./CURD/deleteUser');
var updateUserEntity = require('./updateEntity');

var con = require('./CURD/connection');

function Fine (bot) {
	console.log(bot, "Fine");
	var speech = '';
	if (bot) {
		if (bot.process == 'Add') {
		  if (bot.amount) {
		    if (bot.Users) {
		    	var totla = 0;
			    if (bot.Users) {
			  		return getAllUsers("EnglishFine", bot.Users).then(function(res) {
						var data = res;
						console.log(data);
						var total = 0;
						for (var key in data) {
							total = total + parseInt(data[key].amount); 
						}

						var amount = parseInt(bot.amount) + total; 
						return addOrUpdateUser(new users({
						    name: bot.Users,
						    amount: amount
						})).then(function (res) {
						    speech = bot.amount + 'rs was Added to ' + bot.Users + '\n ' + bot.Users + ' Balance is: ' + amount;
						    return speech;
						});
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
			console.log(bot, "Get");
			return getAllUsers("EnglishFine", bot.Users).then(function(res) {
				var data = res;
				console.log(data);
				var total = 0;
				for (var key in data) {
					total = total + parseInt(data[key].amount); 
				}
				return bot.users ? "Total about for " + bot.users + " is " + total : "Total amount is :" + total;
			});
				
		} else if (bot.process == 'Remove') {
			var totla = 0;
		    if (bot.amount) {
		  		return getAllUsers("EnglishFine", bot.Users).then(function(res) {
					var data = res;
					console.log(data);
					var total = 0;
					for (var key in data) {
						total = total + parseInt(data[key].amount); 
					}

					var amount = total - parseInt(bot.amount); 
					console.log(amount);
					return addOrUpdateUser(new users({
					    name: bot.Users,
					    amount: amount
					})).then(function (res) {
					    speech = bot.amount + 'rs was removed to ' + bot.Users + '\n Your Balance is: ' + amount;
					    return speech;
					});
				});
		  	} else if (bot.Users) {
				return removeUser(bot.Users).then(function (res) {
					if(res) {
						return bot.Users + " Deleted Success fully \n";
					}
				});
			} else {
				speech = "Please mention Their name :(";
		    	return speech;
			}
		} else if (bot.process == 'List') {
			var totla = 0;
			var result = '';
		    console.log(bot, "Get");
			return getAllUsers("EnglishFine", bot.Users).then(function(res) {
				var data = res;
				console.log(data);
				var total = 0;
				for (var key in data) {
					total = total + parseInt(data[key].amount);
					result = result + '\n' + data[key].name + " - " + data[key].amount + 'rs';
				}
				return result + "\n----------------\nTotal amount is : " + total;
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
