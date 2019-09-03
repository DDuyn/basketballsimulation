var Generate = require('../functions/generateFunctions')

module.exports = {
    async Generate (req, res) {
        let generateRanking = req.body.generateRanking
        let region =  req.body.region
        let competition = req.body.competition
        let user = req.body.user
        let season = req.body.season
        let timeout = 5000

        if (generateRanking === 1) Generate.GenerateRanking(user)
        
        setTimeout(() => {
            Generate.GenerateTeamsCompetition(competition, region, user)
            setTimeout(() => {
                Generate.GenerateGroups(competition, user, season)
            }, timeout)
        }, timeout)
       
        res.send({
            Generate: 'Generated'
        })

    }
}