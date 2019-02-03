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
  //var bot = req.body.tr ? req.body.tr : "Seems like some problem. Speak again.";
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
    }).catch(function (err) {
      console.log(err);
    });
    
  } else {      
    var speech = "Sorry I can't Understand :("
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
