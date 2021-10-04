var express = require('express')
var router = express.Router()

var fs = require('fs')


router.put('/:reportId', function(req, res) {
  console.log(req.body)
  
  res.sendStatus(200)
})

module.exports = router