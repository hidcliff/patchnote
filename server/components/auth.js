'use strict';

module.exports = (function() {
  function _getAllTokens(request) {
    return request.cookies['ACCESS_TOKENS'];
  }

  function _getToken(request, id) {
    var tokens = request.cookies['ACCESS_TOKENS'];
    if (id && tokens && tokens[id]) {
      return tokens[id];
    } else {
      return false;
    }
  }

  function _getTokenExceptId(request, id) {
    var tokens = _getAllTokens(request);

    if (id && tokens && tokens[id]) {
      delete tokens[id];
    }

    return tokens;
  }

  function _setToken(response, tokens) {
    if (!tokens || Object.keys(tokens).length === 0) {
      response.clearCookie('ACCESS_TOKENS', {path: '/'});
    } else {
      response.cookie('ACCESS_TOKENS', tokens, {maxAge: (1000 * 60 * 60 * 24 * 365)});
    }
  }

  return {
    getToken: _getToken,

    setToken: function (request, response, id, tokens) {
      var storedTokens = _getAllTokens(request) || {};  //get all tokens
      storedTokens[id] = tokens;
      _setToken(response, storedTokens);
      //response.cookie('ACCESS_TOKENS', storedTokens, {maxAge: (tokens.expiry_date ? tokens.expiry_date : (1000 * 60 * 60 * 24 * 365))});
    },

    clearToken: function(request, response, id) {
      if (id) {
        _setToken(response, _getTokenExceptId(request, id));
      } else {
        response.clearCookie('ACCESS_TOKENS', {path: '/'});
      }
    }
  };
}());
