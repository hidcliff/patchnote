'use strict';

var express = require('express');
var drive = require('../components/googleDrive');
var router = express.Router();

router
  .get('/', function(req, res) {
    drive.isLinked(req, res, function (data, status) {
      res.status(status).json(data);
    })
  })
  .post('/save', function(req, res) {
    drive.saveFile(req, res, function(response) {
      res.json(response);
    });
  })
  .get('/unlink', function(req, res) {
    drive.unlink(req, res, function(data, status) {
      res.json(data, status);
    });
  });

module.exports = router;
