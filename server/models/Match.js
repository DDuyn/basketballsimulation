var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MatchSchema = new Schema({
    Season: Number,
    User: Number,
    Competition: Number,
    Group: String,
    Round: Number,
    Match: Number,
    Home: String,
    PointsHome: Number,
    Away: String,
    PointsAway: Number,
    IsPlayed: Number,
    TypeMatch: String
})

var Match = mongoose.model('matches', MatchSchema)
module.exports = Match