'use strict';

var lib = require('./lib'),
  knex = require('knex')(require('../knexfile').development),
  fs = require('fs'),
  path = require('path'),
  Collection = lib.Collection,
  should = require('should'),
  Model = lib.Model;

describe('bookshelf soft delete', function () {
  before(function () {
    return knex.migrate.latest();
  });

  after(function () {
    fs.unlinkSync(path.join(__dirname, '../dev.sqlite3'));
  });

  describe('A softDeleted model', function () {
    before(function () {
      (new Model())
        .destroy();
    });

    it('should not be visible in fetches', function () {
      return (new Collection())
        .fetch()
        .then(function (results) {
          results.models.length.should.equal(0);
        });
    });

    it('should not be visible in fetchOne', function () {
      return (new Collection())
        .fetchOne()
        .then(function (result) {
          should.not.exist(result);
        });
    });

    it('should be be visible in softDelete: false fetchOne', function () {
      return (new Collection())
        .fetchOne({ softDelete: false })
        .then(function (result) {
          should.exist(result);
        });
    });

    it('should be be visible in softDelete: false fetches', function () {
      return (new Collection())
        .fetch({ softDelete: false })
        .then(function (results) {
          results.models.length.should.equal(1);
        });
    });
  });
});