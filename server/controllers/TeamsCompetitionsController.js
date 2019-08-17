var TeamCompetition = require('../models/TeamCompetition')
var Ranking = require('../models/Ranking')

module.exports = {
    async GeneratePre (req, res) {
        let region =  req.body.region
        let competition = req.body.competition
        let user = req.body.user

        Ranking.find({Region: region, User: user}, {}, { sort: { Points: -1 } } , (error, teams) => {
            if (error) console.error('GeneratePre - Get Ranking', error)
            
            let teamscompetition = teams.slice(9)

            for(var key in teamscompetition) {
                const team = new TeamCompetition()
                team.Team = teamscompetition[key].Team
                team.Competition = competition
                team.Season = 1
                team.User = user
                team.Top = 0
                team.IsEliminated = 0
                team.Points = 0

                team.save((error, teamcompetition) => {
                    if (error) console.error('GeneratePre - Save Teams Competition', error)                    
                })                
            }

            res.send({
                Success: 'Save succesfully'
            })

        })

    }
}