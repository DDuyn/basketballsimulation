var Enum = require('../functions/Enum')
var Common = require('../functions/Common')

module.exports = {
    GetMatchesByCompetition: function GetMatchesByCompetition (competition, user, season) {
        let Model = Common.GetModel(Enum.MODELS.MATCH)
        let Filter = {Competition: competition, User: user, Season: season}
        let Order = { sort: { Round: 1 } }

        return Common.Find(Common.Query(Model, Filter, Order))
    }

}