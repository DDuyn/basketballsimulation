var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CompetitionGroupSchema = new Schema({
    Season: Number,
    User: Number,
    Competition: Number,
    Team: Number,
    Group: String,
    Position: Number,
    Wins: Number,
    Losses: Number,
    PointsFavour: Number,
    PointsAgainst: Number
})

var CompetitionGroup = mongoose.model('competitions-groups', CompetitionGroupSchema)
module.exports = CompetitionGroup