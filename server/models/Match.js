var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MatchSchema = new Schema({
    Season: Number,
    User: Number,
    Competition: Number,
    Group: String,
    Match: Number,
    Home: String,
    PointsHome: Number,
    Visitor: String,
    PointsVisitor: Number,
    IsPlayed: Number,
    TypeMatch: String
})

var Match = mongoose.model('matches', MatchSchema)
module.exports = Match