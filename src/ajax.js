var RSVP = require('rsvp');
var Promise = RSVP.Promise;

module.exports = function(method, url, params) {
  /**
   * Convert an object into a encoded string
   * @param  {Object} object
   * @return {String}
   */
  var parametrize = function(object) {
    var str = "";
    for (var key in object) {
      if (str != "") {
        str += "&";
      }
      str += key + "=" + object[key];
    }
    return str;
  };

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest;
    var async = true;

    if (params) {
      if (method === 'GET') {
        params = parametrize(params);
        url += '?' + params;
      } else if (method === 'POST' || method === 'PUT') {
        params = JSON.stringify(params);
      }
    }

    xhr.open(method, url, async);
    xhr.send(params);

    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          data = JSON.parse(this.response);
        } catch (e) {
          data = {};
        }
        resolve(data);
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.onerror = function() {
      reject(Error("Network Error"));
    };
  });
};