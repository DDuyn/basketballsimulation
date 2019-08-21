var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    Code: Number,
    Name: String,
    Email: String,
    Password: String,
    CurrentSeason: Number
})

var User = mongoose.model('users', UserSchema)
module.exports = User