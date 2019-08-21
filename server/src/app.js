/* eslint-disable no-trailing-spaces */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')

var mongoose = require('mongoose')
mongoose.connect('mongodb://admin:admin19@ds231517.mlab.com:31517/worldcupsimulation', { useNewUrlParser: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded')
})
mongoose.set('debug', true)

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(session({secret: '123', saveUninitialized: true, resave: true}))

require('../routes')(app)

app.listen(process.env.PORT || 8081)
