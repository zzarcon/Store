var Adapter = require('./adapter');
var ajax = require('./ajax');
var Cache = {};

module.exports = function() {

  function saveRecord(model, id, response) {
    if (!Cache[model]) {
      Cache[model] = {};
    }

    Cache[model][id] = response;
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
      return record;
    }

    fetch(model, id);
  }

  /**
   * Make a request to the server for get the record
   * @param  {String} model
   * @param  {String} id
   * @return {Promise}
   */
  function fetch(model, id) {
    var url = [Adapter.host, model, id].join('/');
    return ajax('GET', url).then(function(response) {
      saveRecord(model, id, response);
    });
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

  return {
    Adapter: Adapter,
    find: find,
    fetch: fetch,
    get: get,
    all: all,
    __cache__: Cache
  };
}();