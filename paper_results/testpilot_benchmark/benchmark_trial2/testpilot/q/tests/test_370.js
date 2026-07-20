let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test ninvoke with no additional arguments', function(done) {
        let mockObject = {
            ping: function(callback) {
                setTimeout(() => {
                    callback(null, "pong");
                }, 5);
            }
        };

        q.ninvoke(mockObject, "ping")
            .then(function(result) {
                assert.equal(result, "pong");
                done();
            })
            .catch(done);
    });
});