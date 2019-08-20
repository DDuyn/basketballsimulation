var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RankingSchema = new Schema({
   Team: String,
   CodeTeam: Number,
   Points: Number,
   Region: String,
   User: Number 
})

var Ranking = mongoose.model('ranking', RankingSchema)
module.exports = Ranking