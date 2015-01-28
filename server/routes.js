'use strict';

module.exports = function(app) {
  app.use('/api/dropbox', require('./routes/dropbox'));

  /**
   * related to storage services
   */
  app.use('/link', require('./routes/link'));
  app.use('/oauth', require('./routes/oauth'));

  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(function(req, res) {
      res.render('error');
    });

  app.route('/*')
    .get(function(req, res) {
      //res.render('index.html');
      res.sendFile(app.get('appPath') + '/index.html');
    });
};
