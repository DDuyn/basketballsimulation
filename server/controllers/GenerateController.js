var Generate = require('../functions/generateFunctions')
var Enum = require('../functions/Enum')
var Common = require('../functions/Common')
var Functions = require('../functions/functions')
var Constants = require('../functions/constants')

module.exports = {
   async GenerateGroups (req, res) {        
        let competition = req.body.competition
        let user = req.body.user
        let season = req.body.season

        let teams = await Generate.GenerateGroups(competition, user, season)
        setTimeout(() => {
            if (teams.length > 0) {
                Generate.SaveGroups(competition, user, season, teams)
                    .then((data) => { if (data.length > 0 ) res.send({ Success: 'Generated' })} )
                    .catch(e => Functions.HandleErrors('SaveGroups', 'competitions-groups', e))
            }            
        }, 1000)

    },

    async GenerateTeamsCompetition (req, res) {
        let region =  req.body.region
        let competition = req.body.competition
        let user = req.body.user
        let season = req.body.season
        
        let teams = await Generate.GenerateTeamsCompetition(region, user)
        setTimeout(() => {
            if (teams.length > 0) {     
                Generate.SaveTeamsCompetition(competition, user, season, teams)
                    .then((data) => { if (data.length > 0) res.send({ Success: 'Generated'}) })
                    .catch(e => Functions.HandleErrors('SaveTeamsCompetition', 'teams-competitions', e))
            }
        }, 1000)


    },
    async GenerateRanking (req, res) {
        let user = req.body.user

        let teams = await Generate.GenerateRanking()
        setTimeout(() => {
            if (teams.length > 0) {
                Generate.SaveRanking(user, teams)
                    .then((data) => { if ( data.length > 0 ) res.send({ Success: 'Generated' })})
                    .catch((e) => Functions.HandleErrors('SaveRanking', 'rankings', e))
            }
        }, 1000)
    },
    async GenerateMatches (req, res) {
        let competition = req.body.competition
        let group = req.body.group
        let user = req.body.user
        let season = req.body.season        
        let typeMatch = req.body.typeMatch
       
        let Model = Common.GetModel(Enum.MODELS.COMPETITIONGROUP)
                
        let Filter = {Competition: competition, User: user, Season: season, Group: group}      
        let teams = await Common.Find(Common.Query(Model, Filter))   
        let match = await Generate.GenerateMatchId(user)       
        let matchId = match !== null ? match.Match + 1 : 1    

            setTimeout(() => {
                if (teams.length > 0) { 
                    Generate.GenerateMatches(user, competition, season, group, teams, typeMatch, matchId)
                        .then((data) => { if ( data.length > 0 ) res.send({ Success: 'Generated' })})
                        .catch((e) => Functions.HandleErrors('SaveMatches', 'matches', e))
                }
            }, 1000)
    }
}