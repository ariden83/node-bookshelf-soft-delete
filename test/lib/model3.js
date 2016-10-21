'use strict';

var repository = require('./repo');
repository.plugin(require('../../index'));

module.exports = repository.Model.extend({
  tableName: 'test3'
});
