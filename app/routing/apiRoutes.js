var friendsData = require('../data/friends.js');

module.exports = function (app) {
    
    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
    });

    app.post('/api/friends', function (req, res) {
        
        var bestMatch = {
            name: "",
            photo: "",
            compatibility: 1000
        };

        var userData = req.body;
        var userScores = userData.scores;

        var totalDifference = 0;

        for (var i = 0; i < friendsData.length; i++) {
            totalDifference = 0;

            for (var j = 0; j < friendsData[i].scores[j]; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));
                if (totalDifference <= bestMatch.compatibility) {
                    bestMatch.name = friendsData[i].name;
                    bestMatch.photo = friendsData[i].photo;
                    bestMatch.compatibility = totalDifference;
                }
            }
        }

        friendsData.push(userData);
        res.json(bestMatch);

    });

}