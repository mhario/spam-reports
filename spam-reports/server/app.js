var express = require('express')
var app = express()
var reports = require('./reports')

app.use(express.json())
app.use('/reports', reports)

app.listen(4000)
console.log('Listening on 4000')
