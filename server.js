// Dependences - Required npm packages
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Express configuration
// Tells node this is an "express" server
var app = express();

// Setting up an initial port. 
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }))

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

// Router - points the server to api and html route files.

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Listener to start the server

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});