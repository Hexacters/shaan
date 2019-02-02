"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const restService = express();

var Fine = require('./fine');

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());
let defaultValues = ['hai', 'hi', 'time', 'date', 'hello', 'status']
restService.post("/echo", function(req, res) {
  //var speech = req.body.tr ? req.body.tr.toLowerCase() : "Seems like some problem. Speak again.";
  //console.log(req.body.originalDetectIntentRequest.payload.data.user.name);
  var bot =
      req.body.queryResult &&
      req.body.queryResult.parameters 
        ? req.body.queryResult.parameters
        : "Seems like some problem. Speak again.";

  if (bot.process) {



    Fine(bot).then(function(speech){
      if (!speech) {
        speech = "Sorry! i can't Understand!.. :("
      }
      return res.json({
          fulfillmentText:speech,
          fulfillmentMessages:[
            {
              text: {
                  text: [
                     speech
                  ]
              }
            }
          ],
          source:"Shaan The bot"
      });
    });
    
  } else {
      defaultValues.map(s => {
        if (speech.includes(s)) {
          element = s;
        }
      });

      switch (element) {
      //Speech Synthesis Markup Language 
      case "date":
        var datetime = new Date();
        speech =
          '<speak>Today is ' + datetime.toISOString().slice(0,10) + '</speak>';
        break;
      case "time":
          var date = new Date();
          var year = date.getUTCFullYear();
          var month = date.getUTCMonth();
          var day = date.getUTCDate();
          var hours = date.getUTCHours();
          var min = date.getUTCMinutes();
          var sec = date.getUTCSeconds();
          var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = ((hours + 11) % 12 + 1);
          var time = new Date().getTime();
        speech =
          '<speak>It is ' + hours + ':' + min + ' ' + ampm + ' now</speak>';
        break;

      case "hai":
      case "hello":
      case "haii":
        speech =
          'Haii ' + req.body.originalDetectIntentRequest.payload.data.user.name + '...! :)';
        break;

      case "about you":
      case "status":
        if (req.body.originalDetectIntentRequest.source) {
        speech = 
          'Haii ' + req.body.originalDetectIntentRequest.payload.data.user.name + '..! :) \n' +
          'Now i am in ' + req.body.originalDetectIntentRequest.source + '\n' +
          'We are Talking in ' + 'Persnal Chat';
        } else {
          speech = 'I am online Now';
        }
        break;
      case "doing":
        speech = 
          'I am doing Well what About You';
        break;
      }

      return res.json({
         fulfillmentText:speech,
         fulfillmentMessages:[
            {
                text: {
                    text: [
                       speech
                    ]
                }
            }
        ],
        source:"Hexa"
      });
  }

  
});

restService.listen(port, function() {
  console.log("Server up and listening");
});
