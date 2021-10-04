var express = require('express')
var router = express.Router()

var fs = require('fs')
const reports = require('./reports.json')


router.get('/getAll', function(req, res) {
  // const reports = fs.readFileSync('./reports.json');
  res.send(reports)
})

router.put('/:reportId', function(req, res) {
  const target = reports.elements.find(rep => rep.id === req.params.reportId)

  target.state = req.body.ticketState
  
  fs.writeFileSync('./server/reports.json', JSON.stringify(reports))

  res.sendStatus(202)
})

module.exports = router