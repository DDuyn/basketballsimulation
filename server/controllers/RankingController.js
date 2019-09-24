var Common = require('../functions/Common')
var Enum = require('../functions/Enum')

module.exports = {
    async GetRankings (req, res) {
        let region = req.query.region
        let user = req.query.user

        let Model = Common.GetModel(Enum.MODELS.RANKING)
        let Filter = {Region: region, User: user}
        let Order = {sort: { Points: 1 }}

        let data = await Common.Find(Common.Query(Model, Filter, Order))

        if (data.length > 0) res.send({ Ranking: data })
    
    }
}