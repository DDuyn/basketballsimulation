var CountriesController = require('./controllers/CountriesController')

module.exports = (app) => {
    app.post('/countries', CountriesController.LoadCountries)
}