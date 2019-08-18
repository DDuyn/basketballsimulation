var CompetitionGroup = require('../models/CompetitionGroup')
var TeamCompetition = require('../models/TeamCompetition')

module.exports = {
    async GenerateGroups (req, res) {
        let competition = req.body.competition
        let user = req.body.user
        let season = req.body.season
        let region  = req.body.region

        TeamCompetition.find({Competition: competition, User: user, Season: season}, (error, teams) => {
            if (error) console.error('GenerateGroups - Get Teams Competition', error)

            let tmparr = Array.from(teams)
            let counterGroup = 1
            let counterPosition = 1

            for(var key in tmparr) {
             const competitionGroup = new CompetitionGroup()
             let randomIndex = Math.floor(Math.random() * teams.length)            
             let team = teams.splice(randomIndex,1)
             
             competitionGroup.Season = season
             competitionGroup.User = user
             competitionGroup.Competition = competition
             competitionGroup.Team = team.Team
             competitionGroup.Group = counterGroup
             competitionGroup.Position = counterPosition
             competitionGroup.Wins = 0
             competitionGroup.Losses = 0
             competitionGroup.PointsFavour = 0
             competitionGroup.PointsAgainst = 0

             competitionGroup.save((error, response) => {
                if (error) console.error('Generate Groups - Create Groups')
            })

             if (counterPosition === 10) {
                 counterPosition = 1
                 counterGroup++
             }else{
                 counterPosition++
             }

            }

            res.send({
                Success: 'Save succesfully'
            })

        })

    }
}