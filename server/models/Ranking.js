var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RankingSchema = new Schema({
   Team: Number,
   Points: Number,
   Region: Number,
   User: Number 
})

var Ranking = mongoose.model('ranking', RankingSchema)
module.exports = Ranking