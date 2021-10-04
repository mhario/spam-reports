var express = require('express')
var router = express.Router()

var fs = require('fs')
const reports = require('./reports.json')

const getReport = id => reports.elements.find(rep => rep.id === id)
const writeUpdate = fs.writeFileSync('./server/reports.json', JSON.stringify(reports))

router.get('/getAll', function(req, res) {
  res.send(reports)
})

router.put('/block/:reportId', function(req, res) {

  const target = getReport(req.params.reportId)

  if (target) {
    target.blocked = true
    
    writeUpdate()

    res.send({ success: true })
  } else {
    res.send({ success: false })
  }

})

router.put('/:reportId', function(req, res) {
  
  const target = getReport(req.params.reportId)

  if (target) {
    target.state = req.body.ticketState
    
    writeUpdate()

    res.send({ success: true })
  } else {
    res.send({ success: false })
  }

})

module.exports = router