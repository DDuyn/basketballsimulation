var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TeamSchema = new Schema({
    NAME: String,
    CODE: Number,
    REGION: String
})

var Team = mongoose.model('countries', TeamSchema)
module.exports = Team