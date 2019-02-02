var mongoose = require('mongoose');
var con = require('./connection');
var users = require('./userSchema');
var getAllUsers = require('./getAllUsers');





/*con.once('open', ()=> {*/

	/*var user = new users({
		name: "Mani",
		amount: "100"
	});

	user.save(function (err, user) {
      if (err) return console.error(err);
      console.log(user.amount + 'rs is Added to ' + user.name + ' :)');

		con.db.collection("EnglishFine", function(err, collection){
			collection.find({name: 'surya'}).toArray(function(err, data){
			    console.log(data);
			    con.close(); 
			});
		});

    });*/
		
	getAllUsers();

	

/*});
*/