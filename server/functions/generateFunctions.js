var CompetitionGroup = require('../models/CompetitionGroup')
var TeamCompetition = require('../models/TeamCompetition')
var Ranking = require('../models/Ranking')
var Team = require('../models/Team')
var Constants = require('./constants')
var Functions = require('./functions')

module.exports = {
    GenerateTeamsCompetition: function GenerateTeamsCompetition (Competition, Region, User) {
        Ranking.find({Region: Region, User: User}, {}, { sort: { Points: -1 } } , (error, teams) => {
            if (error) console.error('GeneratePre - Get Ranking', error)
            
            let systemCompetition = Functions.GetSystemCompetition(Competition)
            let slice = teams.length - systemCompetition.Quantity
            let teamscompetition = teams.slice(slice)

           for(var key in teamscompetition) {
                const team = new TeamCompetition()
                team.Team = teamscompetition[key].Team
                team.CodeTeam = teamscompetition[key].CodeTeam
                team.Competition = Competition
                team.Season = 1
                team.User = User
                team.Top = 0
                team.IsEliminated = 0
                team.Points = 0

                team.save((error, teamcompetition) => {
                    if (error) console.error('GeneratePre - Save Teams Competition', error)                    
                })                
            }
        })
    },
    GenerateGroups: function GenerateGroups (Competition, User, Season) {
        TeamCompetition.find({Competition: Competition, User: User, Season: Season}, (error, teams) => {
            if (error) console.error('GenerateGroups - Get Teams Competition', error)
            let tmparr = Array.from(teams)
            let counterGroup = 0
            let counterPosition = 1
            let systemCompetition = Functions.GetSystemCompetition(Competition)
            
           for(var key in tmparr) {
            const competitionGroup = new CompetitionGroup()
            let randomIndex = Math.floor(Math.random() * teams.length)            
            let team = teams.splice(randomIndex,1)
            
            competitionGroup.Season = Season
            competitionGroup.User = User
            competitionGroup.Competition = Competition
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
        })        
    },
    GenerateRanking: function GenerateRanking (User) {
        Team.find({}, ((error, teams) => {
            if (error) console.error('LoadRanking - GetTeams', error)
 
            for (var key in teams) {
             const rank = new Ranking()
             rank.Team = teams[key].NAME
             rank.CodeTeam = teams[key].CODE
             rank.Points = 0
             rank.Region = teams[key].REGION
             rank.User = User
 
             rank.save((error, rank) => {
                 if (error) console.error('LoadRanking - SaveRanking', error)
             })
             } 
         }))
     }
}