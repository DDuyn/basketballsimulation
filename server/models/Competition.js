var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CompetitionSchema = new Schema({
    Code: Number,
    Name: String,
    Quantity: Number,
    Region: String,
    Games: Number
})

var Competition = mongoose.model('competitions', CompetitionSchema)
module.exports = Competition