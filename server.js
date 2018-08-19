//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Tells node that we are creating an "express" server
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Maps how server responds from various URLs
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Starts server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });