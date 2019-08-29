//jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

var request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  var cryp = req.body.Crypto;
  var amount = req.body.amount;
  var curr = req.body.fiat;


  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: cryp,
      to:   curr,
      amount:  amount
    }
  };

  request(options, function (error, response, body) {

    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;

    res.write("<p>Today's Date is: " + currentDate + "</p>");

    res.write("<h1>" + amount + " " + cryp +  " is currently worth: " + price + " " + curr +"</h1>");

    res.send();
});

});

app.listen(3000, function () {
console.log("Server running on port 3000");

});
