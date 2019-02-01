//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://root:admin123@ds117545.mlab.com:17545/hexa';
mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var con = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
con.on('error', console.error.bind(console, 'MongoDB connection error:'));

var userData = mongoose.Schema({
    name : { type: String, required: true, trim: true },
    amount : { type: String, trim: true }
});

var user = mongoose.model('user', userData, 'EnglishFine');
con.once('open', function () {

	/*var user1 = new user({
		name: "Surya",
		amount: "100"
	});*/
	/*user1.save(function (err, user) {
      if (err) return console.error(err);
      console.log(user.amount + 'rs is Added to ' + user.name + ' :)');

		con.db.collection("EnglishFine", function(err, collection){
			collection.find({name: 'surya'}).toArray(function(err, data){
			    console.log(data); 
			});
		});

    });*/

    con.db.collection("EnglishFine", function(err, collection){
			collection.find({name:"Surya"}).toArray(function(err, data){
			    console.log(data); 
			});
		});

});
