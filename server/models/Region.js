var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RegionSchema = new Schema({
    Name: String,
    Code: Number
})

var Region = mongoose.model('regions', RegionSchema)
module.exports = Region