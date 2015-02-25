/**
 * Store description...
 */
var RSVP = require('rsvp');
var Promise = RSVP.Promise;
var Record = require('./record');
var Adapter = require('./adapter');
var ajax = require('./ajax');
var Cache = {};

module.exports = function() {

  /**
   * Saves a record into the cache
   * @param  {String} model
   * @param  {Number} id
   * @param  {Object} record
   * @return {void}
   */
  function saveRecord(model, id, record) {
    if (!Cache[model]) {
      Cache[model] = {};
    }

    Cache[model][id] = record;
  }
  /**
   * Fetch or return from the cache the record
   * @param  {String} model
   * @param  {String} id
   * @return {Promise}
   */
  function find(model, id) {
    var record = get(model, id);

    if (record) {
      return new Promise(function(resolve) {
        resolve(record);
      });
    }

    return fetch(model, id);
  }

  /**
   * Make a request to the server for get the record
   * @param  {String} model
   * @param  {String} id
   * @return {Promise}
   */
  function fetch(model, id) {
    var url = Adapter.buildUrl(model, id);
    var request = ajax('GET', url);

    request.then(function(response) {
      saveRecord(model, id, response);
    });

    return request;
  }

  /**
   * Return a record from the cache
   * @param  {String} model
   * @param  {String} id
   * @return {Object}
   */
  function get(model, id) {
    if (!Cache[model]) {
      return;
    }

    return Cache[model][id];
  }

  /**
   * Return all records from the cache of the passed model
   * @param  {String} model
   * @return {Object}
   */
  function all(model) {
    return Cache[model];
  }

  /**
   * Creates a record locally
   * @param  {String} model
   * @param  {Object} properties
   * @return {Record}
   */
  function createRecord(model, properties) {
    return new Record(model, properties);
  }

  return {
    Adapter: Adapter,
    find: find,
    fetch: fetch,
    get: get,
    all: all,
    createRecord: createRecord,
    __cache__: Cache
  };
}();