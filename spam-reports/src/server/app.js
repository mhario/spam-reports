var express = require('express')
var app = express()
var reports = require('./reports')

app.get('/', function(req, res) {
  // res.send('Landing page!')
  res.redirect('localhost:3000')
})

app.use('/reports', reports)

app.listen(4000)
console.log('Listening on 4000')
