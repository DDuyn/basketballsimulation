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
    }
}