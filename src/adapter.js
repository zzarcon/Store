/**
 * Adapter description...
 */
module.exports = function() {
  var host = '';

  function buildUrl(model, id) {
    return [host, model, id].join('/');
  }

  return {
    host: host,
    buildUrl: buildUrl
  };
}();