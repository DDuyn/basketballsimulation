var TeamsController = require('./controllers/TeamsController')
var RegionsController = require('./controllers/RegionsController')
var RankingController = require('./controllers/RankingController')
var CompetitionGroupsController = require('./controllers/CompetitionsGroupController')
var UsersController = require('./controllers/UsersController')
var GenerateController = require('./controllers/GenerateController')


module.exports = (app) => {
    
    //Generate
    app.post('/generateGroups', GenerateController.GenerateGroups)
    app.post('/generateRanking', GenerateController.GenerateRanking)
    app.post('/generateTeamsCompetition', GenerateController.GenerateTeamsCompetition)

    //User Request
    app.post('/register', UsersController.Register)
    app.post('/login', UsersController.Login)
    app.put('/update', UsersController.UpdateGeneratedAndSeason)

    //Ranking Request
    app.get('/ranking', RankingController.GetRankings)

    //Countries Request
    app.post('/countries', TeamsController.LoadCountries)

    //Regions Request
    app.get('/regions', RegionsController.LoadRegions)

    //CompetitionGroups
    app.get('/competitionsgroups/:codeCompetition', CompetitionGroupsController.GetCompetitionGroups)

}