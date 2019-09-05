var Generate = require('../functions/generateFunctions')
var Functions = require('../functions/functions')

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
        
        let teams = await Generate.GenerateTeamsCompetition(competition, region, user)
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
    }
}