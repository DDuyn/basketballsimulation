var TeamsController = require('./controllers/TeamsController')
var RegionsController = require('./controllers/RegionsController')
var RankingController = require('./controllers/RankingController')
var CompetitionGroupsController = require('./controllers/CompetitionsGroupController')
var UsersController = require('./controllers/UsersController')
var GenerateController = require('./controllers/GenerateController')
var MatchesController = require('./controllers/MatchesController')


module.exports = (app) => {
    
    //Generate
    app.post('/generateGroups', GenerateController.GenerateGroups)
    app.post('/generateRanking', GenerateController.GenerateRanking)
    app.post('/generateTeamsCompetition', GenerateController.GenerateTeamsCompetition)
    app.post('/generateMatches', GenerateController.GenerateMatches)

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
    app.get('/matches', MatchesController.GetMatchesByGroup)
    // app.get('/competitionsgroups/:codeCompetition/group/:group', CompetitionGroupsController.GetTeamsByGroup)

}