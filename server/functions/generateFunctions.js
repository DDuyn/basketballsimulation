var CompetitionGroup = require('../models/CompetitionGroup')
var TeamCompetition = require('../models/TeamCompetition')
var Ranking = require('../models/Ranking')
var Team = require('../models/Team')
var Match = require('../models/Match')
var Constants = require('./constants')
var Functions = require('./functions')
var Common = require('./Common')
var Enum = require('./Enum')

module.exports = {
    GenerateTeamsCompetition: function GenerateTeamsCompetition (Region, User) {
       return Ranking.find({Region: Region, User: User}, {}, { sort: { Points: -1 } })
       .then((teams) => {
            return teams
        })
        .catch((error) => {
            Functions.HandleErrors('GenerateTeamsCompetition', 'rankings', error)
        })
    },
    SaveTeamsCompetition: function SaveTeamsCompetition (Competition, User, Season, Teams) {
            
        if (Teams.length > 0) {               
            let systemCompetition = Functions.GetSystemCompetition(Competition)
            let slice = Teams.length - systemCompetition.Quantity
            let teamscompetition = Teams.slice(slice)
            let promises = []
           for(var key in teamscompetition) {
               
                const team = new TeamCompetition()
                team.Team = teamscompetition[key].Team
                team.CodeTeam = teamscompetition[key].CodeTeam
                team.Competition = Competition
                team.Season = Season
                team.User = User
                team.Top = 0
                team.IsEliminated = 0
                team.Points = 0
                
                promises.push(team.save())         
            }
            return Promise.all(promises)
        }
    },
    GenerateGroups: function GenerateGroups (Competition, User, Season) {
       return TeamCompetition.find({Competition: Competition, User: User, Season: Season})
       .then((teams) => { return teams })
       .catch((error) => { 
           Functions.HandleErrors('GenerateGroups', 'teams-competitions', error)
       })
    },
    SaveGroups: function SaveGroups (Competition, User, Season, Teams) {
        let tmparr = Array.from(Teams)
        let counterGroup = 0
        let counterPosition = 1
        let systemCompetition = Functions.GetSystemCompetition(Competition)
        let promises = []
        for(var key in tmparr) {
            const competitionGroup = new CompetitionGroup()
            let randomIndex = Math.floor(Math.random() * Teams.length)            
            let team = Teams.splice(randomIndex,1)
            
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

            promises.push(competitionGroup.save())

            if (counterPosition === systemCompetition.NumberTeamsByGroup) {
                counterPosition = 1
                counterGroup++
            }else{
                counterPosition++
            }
        }

        return Promise.all(promises)
    },
    GenerateRanking: function GenerateRanking () {
       return Team.find({})
       .then((teams) => { return teams })
       .catch((error) => { 
           Functions.HandleErrors('GenerateRanking', 'countries', error)
       })
     },
    SaveRanking: function SaveRanking (User, Teams) {
        let promises = []
        for (var key in Teams) {
            const rank = new Ranking()
            rank.Team = Teams[key].NAME
            rank.CodeTeam = Teams[key].CODE
            rank.Points = 0
            rank.Region = Teams[key].REGION
            rank.User = User
            
            promises.push(rank.save())

            }         

           return Promise.all(promises)
    },
    GenerateMatchId: function GenerateMatchId (User) {
        let Model = Common.GetModel(Enum.MODELS.MATCH)
        let Filter = {User: User}        
        let Order = {sort: { Match: -1 }}
        let Limit = 1    
        return Common.FindOne(Common.Query(Model, Filter, Order, Limit))
    },
    GenerateMatches: function GenerateMatches (User, Competition, Season, Group, Data, TypeMatch, matchId) {
        let teams = Array.from(Data)
        let halfCount = Data.length / 2
        let SystemCompetition = Functions.GetSystemCompetition(Competition)
        let promises = [] 
        for (var x = 1; x <= SystemCompetition.RoundsByGroup; x++) {    
            for(var key in teams) {
              if (key >= halfCount) break       
              let home = teams[key]
              let away = teams[parseInt(key) + parseInt(halfCount)]
              
              const match = new Match()
              match.Season = Season
              match.User = User
              match.Competition = Competition
              match.Group = Group
              match.Round = x
              match.Match = matchId
              match.PointsHome = 0
              match.PointsAway = 0
              match.IsPlayed = 0              
              match.TypeMatch = TypeMatch
              if (x % 2 === 0) {
                match.Home = home.Team
                match.Away = away.Team
              }else{
                match.Home = away.Team
                match.Away = home.Team
              }                      
              promises.push(match.save())
              matchId++
            }
            Functions.RotateTeams(teams)            
          }          
          return Promise.all(promises)         
    }
}