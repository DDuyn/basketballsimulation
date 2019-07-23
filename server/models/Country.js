var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CountrySchema = new Schema({
    Name: String,
    Code: String,
    Region: String,
    Flag: String
})

var Country = mongoose.model('Countries', CountrySchema)
module.exports = Country