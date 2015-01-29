'use strict';

var express = require('express');
var router = express.Router();
var dropbox = require('../components/dropbox');

router
  .get('/dropbox', dropbox.authorize)
  .get('/googledrive', require('../components/googleDrive').authorize);

module.exports = router;
