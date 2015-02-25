/**
 * Record description...
 */
var Adapter = require('./adapter');
var ajax = require('./ajax');
var extend = require('./utils').extend;

var Record = function(model, properties) {
  this._data = {
    model: model,
    isNew: true
  };

  extend(this, properties);
};

/**
 * Make a request against the server for save or update the record
 * @return {Promise}
 */
Record.prototype.save = function() {
  var method = this._data.isNew ? 'POST' : 'PUT';
  var url = Adapter.buildUrl(this._data.model);
  var properties = this.getProperties();
  var request = ajax(method, url, properties);

  request.then(function(response) {
    if (!properties.id) {
      throw Error('The record must have "id"');
    }

    this._data.isNew = false;
  });

  return request;
};

/**
 * Return all the record properties; removing the non important
 * @return {Object}
 */
Record.prototype.getProperties = function() {
  var props = extend({}, this);
  delete props._data;

  return props;
};

Record.prototype.delete = function() {

};

module.exports = Record;