var Enum = require('../functions/Enum')
var Common = require('../functions/Common')
var Functions = require('../functions/functions')

module.exports = {
    async GetMatchesByGroup (req, res) {
        let competition = req.query.Competition
        let user = req.query.User
        let season = req.query.Season

        let Model = Common.GetModel(Enum.MODELS.MATCH)
        let Filter = {Competition: competition, User: user, Season: season}
        let Order = { sort: { Round: 1 } }

        let matches = await Common.Find(Common.Query(Model, Filter, Order))

        res.send({
            Status: 200,
            Matches: matches
        })
        
    }
}