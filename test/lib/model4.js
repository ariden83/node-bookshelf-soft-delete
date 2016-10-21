'use strict';

var repository = require('./repo');
repository.plugin(require('../../index'));

module.exports = repository.Model.extend({
  soft: true,
  tableName: 'test4'
});
