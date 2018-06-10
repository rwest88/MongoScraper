var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

require("./config/routes.js")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router);

// If deployed, use the deployed database, otherwise use the local database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
// process.env.MONGODB_URI || 

mongoose.connect(db, function(err) {
  if (err) return console.log(err);
  console.log("mongoose connection successful")
})

app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});