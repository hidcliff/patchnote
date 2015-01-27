'use strict';

var app = require('../app');
var request = require('supertest');
var should = require('should');

describe('GET /api/data', function() {
  it('should respond with JSON ', function(done) {
    request(app)
      .get('/api/data/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        should(res.body).have.property('success', true);
        done();
      });
  });
});
