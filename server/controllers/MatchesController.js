var Queries = require('../queries/MatchQueries')

module.exports = {
    async GetMatchesByGroup (req, res) {
        let competition = req.query.Competition
        let user = req.query.User
        let season = req.query.Season

        let matches = await Queries.GetMatchesByCompetition(competition, user, season)

        res.send({
            Status: 200,
            Matches: matches
        })
        
    }
}