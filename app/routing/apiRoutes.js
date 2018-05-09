//Require and pull in data from friends.js file
var friends = require("../data/friends.js");

module.exports = function(app) {

	//API GET request when the user visits the page.
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

// API POST Requests
	app.post("/api/friends", function(req, res){

//Compares user with their best friend match 
		//Object to hold the best match
		var bestMatch = {
			name: "",
			photo: "",
			// Make the initial friendDifference value big for comparison
			friendDifference: 1000
		};

		// Take the result of the user's survey POST and parse it.
		var userData = req.body;
		var userName = userData.name;
		var userPhoto = userData.photo;
		var userScores = userData.scores;

		var totalDifference = 0;

		// Loops through all the friends in the database. 
		for (var i = 0; i < friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			// Loops through all the scores of each friend
			for (var j = 0; j < friends[i].scores[j]; j++) {

				// Calculates the difference between the scores and sums them into totalDifference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= bestMatch.friendDifference){

					//Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		// Finally save the user's data to the database AFTER the check. 
		// Otherwise, the database will always return the user as their own best friend.
		friends.push(userData);

		// Return a JSON with the user's best match.  
		res.json(bestMatch);

	});

}
