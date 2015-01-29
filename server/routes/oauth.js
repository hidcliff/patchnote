'use strict';

var express = require('express');
var router = express.Router();
var dropbox = require('../components/dropbox');


router
  .get('/', function(req, res) {

  })
  .get('/dropbox', function(req, res, next) {
    dropbox.setAccessToken(req, res, next);
  })
  .get('/googledrive', function(req, res, next) {
    require('../components/googleDrive').setCredentials(req, res, next);
  });

module.exports = router;
