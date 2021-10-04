var express = require('express')
var router = express.Router()

var fs = require('fs')
const reports = require('./reports.json')


router.get('/getAll', function(req, res) {
  // const reports = fs.readFileSync('./reports.json');
  res.send(reports)
})

router.put('/:reportId', function(req, res) {
  console.log(req.body)
  
  res.sendStatus(200)
})

module.exports = router