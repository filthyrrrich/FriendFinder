var friends = require("../data/friends");


module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        
        //grabs the scores array from users input
        var scores = req.body.scores;
        console.log(req.body);
        //converts user input to integers
        // var map1 = scores.map(x => parseInt(x));
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

            //console.log("totalDiffs:",totalArray);
        }
        //finds smallest number
        var bestMatch = Math.min.apply(Math,totalArray);
        //checks totalarray for position of smallest number
        var matched = totalArray.findIndex(match => match === bestMatch);

        console.log(totalArray);
        console.log(matched);

        //grab friends[matched].name
        console.log(friends[matched].name);
        
        //grab friends[matched].photo
        console.log(friends[matched].photo);
        console.log(req.body);
        res.json(friends[matched]);

        
        // console.log("Best MAtch",Math.min.apply(Math,totalArray));
        // console.log(Math.min(totalArray));

        //adds user input to friends API List
        friends.push(req.body);
    });
}