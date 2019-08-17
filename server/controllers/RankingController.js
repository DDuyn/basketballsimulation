var Ranking = require('../models/Ranking')
var Team = require('../models/Team')


module.exports = {
    async LoadRanking (req, res) {
        Team.find({}, ((error, teams) => {
           if (error) console.error('LoadRanking - GetTeams', error)

           for (var key in teams) {
            const rank = new Ranking()
            rank.Team = teams[key].CODE
            rank.Points = 0
            rank.Region = teams[key].REGION
            rank.User = 1

            rank.save((error, rank) => {
                if (error) console.error('LoadRanking - SaveRanking', error)
            })
            } 

            res.send({
                Success: 'Save succesfully'
            })
        }))
    }
}