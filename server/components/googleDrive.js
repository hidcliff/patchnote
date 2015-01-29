
var googleapis = require('googleapis');
var auth = require('./auth');
var config = require('../config/local');

module.exports = (function() {
  /*
  var CLIENT_ID = '108743306316-knirq3pe9p72sk4ecaaudplsmds61fu8.apps.googleusercontent.com',
    CLIENT_SECRET = 'ypgWZZ1bgSk1FSturrpN_r-e',
    REDIRECT_URL = 'http://{{host}}/oauth/googledrive',
    SCOPE = 'https://www.googleapis.com/auth/drive.file';
  */

  var CLIENT_ID = config.googleDrive.clientId;
  var CLIENT_SECRET = config.googleDrive.clientSecret;
  var REDIRECT_URL = 'http://{{host}}/oauth/googledrive';
  var SCOPE = 'https://www.googleapis.com/auth/drive';

  var OAuth2 = googleapis.auth.OAuth2;
  var oauth2Client = null;
  var drive = null;

  function _isLinked(req) {
    var accessToken = auth.getToken(req, 'drive');
    REDIRECT_URL = REDIRECT_URL.replace(/\{\{host\}\}/, req.header('host'));
    oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
    drive = googleapis.drive({ version: 'v2', auth: oauth2Client });

    if (accessToken) {
      oauth2Client.setCredentials(accessToken);
      return true;
    }
    return false;
  }

  return {
    authorize: function(req, res) {
      var url = oauth2Client.generateAuthUrl({ scope: SCOPE });
      res.redirect(url);
    },

    setCredentials: function(req, res, next) {
      var code = req.param('code');

      oauth2Client.getToken(code, function(err, tokens) {
        if (!err) {
          oauth2Client.setCredentials(tokens);
          auth.setToken(req, res, 'drive', tokens);
        }

        next();
      });
    },

    saveFile : function(req, res, callback) {
      drive.files.insert({
        resource: {
          title: req.param('title'),
          mimeType: 'text/plain'
        },
        media: {
          mimeType: 'text/plain',
          body: req.param('content')
        }
      }, function(err, response) {
        callback({
          path: response.title
        });
      });
    },

    unlink: function(req, res, callback) {
      oauth2Client.revokeCredentials(function(err, response) {
        auth.clearToken(req, res, 'drive');
        //res.clearCookie('accessTokenForDrive', {path:'/'});
        callback({success: true}, 200);
      });
    },

    isLinked : function(req, res, callback) {
      callback({
        isLinked: _isLinked(req)
      }, 200);
    }
  }
}());

