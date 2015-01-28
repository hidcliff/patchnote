'use strict';

var express = require('express');
var dropbox = require('../components/dropbox');
var router = express.Router();

router
  .get('/', function(req, res) {
    dropbox.isLinked(req, res, function (data, status) {
      //res.json(data, status);
      res.status(status).json(data);
    })
  })
  .post('/save', function(req, res) {
    dropbox.saveFile(req, res, function(status, reply) {
      res.json(reply, status);
    });
  })
  .get('/unlink', function(req, res) {
    dropbox.unlink(req, res, function(data, status) {
      res.json(data, status);
    });
  });

module.exports = router;
