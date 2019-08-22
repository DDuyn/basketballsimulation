var CompetitionGroup = require('../models/CompetitionGroup')
var TeamCompetition = require('../models/TeamCompetition')
var Constants = require('../functions/constants')
var Functions = require('../functions/functions')

module.exports = {
    async GenerateGroups (req, res) {
        let competition = req.body.competition
        let user = req.body.user
        let season = req.body.season
        let region  = req.body.region
        
        TeamCompetition.find({Competition: competition, User: user, Season: season}, (error, teams) => {
            if (error) console.error('GenerateGroups - Get Teams Competition', error)

            let tmparr = Array.from(teams)
            let counterGroup = 0
            let counterPosition = 1
            let systemCompetition = Functions.GetSystemCompetition(competition)
            
           for(var key in tmparr) {
            const competitionGroup = new CompetitionGroup()
            let randomIndex = Math.floor(Math.random() * teams.length)            
            let team = teams.splice(randomIndex,1)

            competitionGroup.Season = season
            competitionGroup.User = user
            competitionGroup.Competition = competition
            competitionGroup.Team = team[0].Team
            competitionGroup.CodeTeam = team[0].CodeTeam
            competitionGroup.Group = Constants.GROUPS[counterGroup]
            competitionGroup.Position = counterPosition
            competitionGroup.Wins = 0
            competitionGroup.Losses = 0
            competitionGroup.PointsFavour = 0
            competitionGroup.PointsAgainst = 0

            competitionGroup.save((error, response) => {
                if (error) console.error('Generate Groups - Create Groups', error)
            })

            if (counterPosition === systemCompetition.NumberTeamsByGroup) {
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

    },

    async GetCompetitionGroups(req, res) {
      let competition = req.params.codeCompetition

      CompetitionGroup.find({Competition: competition}, {}, {sort: { Group: 1, Position: 1 } }, (error, groups) => {
        if (error) console.error('Get Groups Competition', error)

        res.send({
          groups: groups
        }) 

      })

    }
}