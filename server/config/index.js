'use strict';

var path = require('path');

module.exports = {
  env: process.env.NODE_ENV || 'development',

  // Server port
  port: process.env.PORT || 4000,

  // Root path
  root: path.normalize(__dirname + '/../..'),

  dropbox: {
    appKey: process.env.DROPBOXAPPKEY,
    appSecret: process.env.DROPBOXAPPSECRET
  }
};
