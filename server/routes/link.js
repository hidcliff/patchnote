'use strict';

var express = require('express');
var router = express.Router();
var dropbox = require('../components/dropbox');

router
  .get('/dropbox', dropbox.authorize);

module.exports = router;
