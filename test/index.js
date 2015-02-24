var sinon = require('sinon');
var assert = require('assert');
var server = sinon.fakeServer.create();

server.autoRespond = true;

describe('Store', function() {
  describe('Find', function() {
    it('Should find the record if is not in the cache', function(done) {
      var record = Store.get('user', 1);
      assert.equal(typeof record, "undefined");

      server.respondWith('/user/1', '{id: 1}');
      record = Store.find('user', 1);
      record.then(function(response) {
        assert.equal(typeof response, "object");
        done();
      });
    });
  });
});