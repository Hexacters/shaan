"use strict";

var mongoose = require('mongoose');
var con = require('./connection');
var users = require('./userSchema');

function addUser(user) {

	con.on('open', ()=> {});

    var userData = {};
	userData = Object.assign(userData, user._doc);
	delete userData._id;
    return users.findOneAndUpdate(
	    {name: user.name}, // find a document with that filter
	    userData, // document to insert when nothing was found
	    {upsert: true, new: true, runValidators: true}, // options
	    function (err, doc) { // callback
	        if (err) {
	           console.log(err.errmsg);
	        } else {
	          return doc.name +' Was Updated Successfully \n';
	        }
	        con.close();
	    }
	);

}

module.exports = addUser;
