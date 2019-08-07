var Country = require('../models/Team')
var fetch = require('node-fetch')

module.exports = {
    async LoadCountries (req, res) {
        fetch('https://restcountries.eu/rest/v2/all')
        .then((response) => {
            return response.json()
        })
        .then((item) => {     
            let countries = item
            for (var key in countries) {
                let country = new Country()
                country.Name = countries[key].name
                country.Code = countries[key].alpha2Code
                country.Region = countries[key].region
                country.Flag = countries[key].flag
                country.save(function (error) {
                    if (error) console.error('Error Save Countries', error)
                    return res.send({
                        success: true,
                        message: 'Countries saved successfully'
                    })
                })
            }
        })
    }
}