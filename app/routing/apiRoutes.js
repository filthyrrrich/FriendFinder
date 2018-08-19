//Dependencies
var friends = require("../data/friends");


module.exports = function(app) {
    
    //route to display friends API List
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    //route for posting to API List
    app.post("/api/friends", function(req, res) {
        
        //grabs the scores array from users input
        var scores = req.body.scores;
        //loop thru friends
        var totalArray = [];
        for (let k = 0; k < friends.length; k++) {
            //store scores of each friends
            var fArray = friends[k].scores;
            //compare each friends scores to user input score and find difference
            var sum = scores.map(function (num, idx) {
                return Math.abs(num - fArray[idx]);
            });
            //finds total diff between user input and each friends
            var totalDiff = sum.reduce((a,b) => a + b, 0);
            //makes array of totals
            totalArray.push(totalDiff);
        }

        //finds smallest number
        var bestMatch = Math.min.apply(Math,totalArray);
        //checks totalarray for position of smallest number
        var matched = totalArray.findIndex(match => match === bestMatch);
        res.json(friends[matched]);
        friends.push(req.body);
    });
}