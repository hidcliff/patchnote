
var dbox = require('dbox');
var config = require('../config');


module.exports = (function(appKey, appSecret) {
  var app = dbox.app({
    'app_key': appKey,
    'app_secret': appSecret
  });
  var client = null;

  function _getClient(req) {
    if (_isLinked(req)) {
      return client;
    } else {
      _authorize(req, res);
    }
    return false;
  }

  function _isLinked(req) {
    if (client) {
      return true;
    } else {
      var accessToken = req.cookies['accessToken'];
      if (accessToken) {
        client = app.client(accessToken);
        return true;
      }
    }
    return false;
  }

  function _authorize(req, res) {
    var callback = 'http://' + req.header('host') + '/oauth/dropbox';
    app.requesttoken(function(status, requestToken) {
      res.cookie('requestToken', requestToken, {maxAge: 900000});
      res.redirect(requestToken.authorize_url + '&oauth_callback=' + encodeURIComponent(callback));
    });
  }

  return {
    /**
     * authorize to connect with Dropbox
     * @param req
     * @param res
     */
    authorize: _authorize,

    /**
     * set access token
     * @param req
     * @param res
     * @param next
     */
    setAccessToken : function(req, res, next) {
      var requestToken = req.cookies['requestToken'];

      app.accesstoken(requestToken, function(status, accessToken) {
        res.cookie('accessToken', accessToken, {maxAge: (1000 * 60 * 60 * 24 * 365)});
        res.clearCookie('requestToken', {path:'/'});

        next();
      });
    },

    /**
     * save a file to dropbox
     * @param req
     * @param res
     */
    saveFile : function(req, res, callback) {
      _getClient(req, res).put('/Patchnote/' + req.param('title'), req.param('content'), function(status, reply) {
        //console.log(status);
        //console.log(reply);
        callback(status, reply);
      });
    },

    /**
     * get a file from dropbox
     * @param req
     * @param res
     */
    getFile : function(req, res) {
      _getClient(req, res).get('/Untitled.md', function(status, reply, metadata) {
        console.log(status);
        console.log(reply.toString());
      });
    },

    readDir : function(req, res) {

    },

    /**
     * get an account from dropbox
     * @param req
     * @param res
     */
    getAccount : function(req, res) {

    },

    unlink: function(req, res, callback) {
      client = null;
      res.clearCookie('accessToken', {path:'/'});
      callback({success: true}, 200);
    },

    isLinked: function(req, res, callback) {
      callback({
        isLinked: _isLinked(req)
      }, 200);
    }
  }
}(config.dropbox.appKey, config.dropbox.appSecret));
