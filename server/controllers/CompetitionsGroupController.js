var CompetitionGroup = require('../models/CompetitionGroup')
var Enum = require('../functions/Enum')
var Common = require('../functions/Common')
var Functions = require('../functions/functions')

module.exports = {
    async GetCompetitionGroups(req, res) {
      let competition = req.params.codeCompetition
      let user = req.query.user
      let season = req.query.season
       
      CompetitionGroup.find({Competition: competition, User: user, Season: season}, {}, {sort: { Group: 1, Position: 1 } }, (error, groups) => {
        if (error) console.error('Get Groups Competition', error)

        res.send({
          groups: groups
        }) 

      })
    },

    async GetTeamsByGroup(req, res) {
      let competition = req.params.codeCompetition
      let group = req.params.group
      let user = req.query.user
      let season = req.query.season

      let Model = Common.GetModel(Enum.MODELS.COMPETITIONGROUP)
      let SystemCompetition = Functions.GetSystemCompetition(4)
      let Filter = {Competition: 4, User: 1, Season: 1, Group: 'A'}
 
      let data = await Common.Find(Common.Query(Model, Filter))
      let matches = []
      let teams = Array.from(data)
      let halfCount = data.length / 2
      
      for (var x = 1; x <= SystemCompetition.RoundsByGroup; x++) {    
        for(var key in teams) {
          if (key >= halfCount) break
     
          let home = teams[key]
          let away = teams[parseInt(key) + parseInt(halfCount)]
          let match = []
          if (x % 2 === 0) {
            match = {
              Round: x,
              Home: home.Team,
              Away: away.Team
            }
          }else{
            match = {
              Round: x,
              Home: away.Team,
              Away: home.Team
            }
          }         

          matches.push(match)
        }
        Functions.RotateTeams(teams)
      }

        console.log(matches) 
    }


}