var TeamsController = require('./controllers/TeamsController')
var RegionsController = require('./controllers/RegionsController')
var RankingController = require('./controllers/RankingController')

module.exports = (app) => {
    
    //Countries Request
    app.post('/countries', TeamsController.LoadCountries)

    //Regions Request
    app.get('/regions', RegionsController.LoadRegions)

    //Ranking Request
    app.get('/rankings', RankingController.LoadRanking)
}