var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TeamCompetitionSchema = new Schema({
    Team: String,
    CodeTeam: Number,
    Competition: Number,
    Season: Number,
    User: Number,
    Top: Number,
    IsEliminated: Boolean,
    Points: Number
})

var TeamCompetition = mongoose.model('teams-competitions', TeamCompetitionSchema)
module.exports = TeamCompetition