'use strict';

module.exports = function(app) {
  app.use('/api/data', require('./routes/data'));

  /*
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(function(req, res) {
      res.render('error');
    });
  */

  app.route('/*')
    .get(function(req, res) {
      //res.render('index.html');
      res.sendFile(app.get('appPath') + '/index.html');
    });
};
