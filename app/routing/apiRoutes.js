//Require and pull in data from friends.js file
var friends = require("../data/friends.js");

module.exports = function(app) {

	//API GET request when the user visits the page.
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});
}