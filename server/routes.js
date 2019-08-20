var TeamsController = require('./controllers/TeamsController')
var RegionsController = require('./controllers/RegionsController')
var RankingController = require('./controllers/RankingController')
var TeamCompetitionController = require('./controllers/TeamsCompetitionsController')
var CompetitionGroupsController = require('./controllers/CompetitionsGroupController')

module.exports = (app) => {
    
    //Countries Request
    app.post('/countries', TeamsController.LoadCountries)

    //Regions Request
    app.get('/regions', RegionsController.LoadRegions)

    //Ranking Request
    app.post('/rankings', RankingController.LoadRanking)

    //TeamCompetition Request
    app.post('/teamscompetition', TeamCompetitionController.GeneratePre)

    //CompetitionGroups
    app.post('/competitiongroups', CompetitionGroupsController.GenerateGroups)
    app.get('/competitionsgroups/:codeCompetition', CompetitionGroupsController.GetCompetitionGroups)

}