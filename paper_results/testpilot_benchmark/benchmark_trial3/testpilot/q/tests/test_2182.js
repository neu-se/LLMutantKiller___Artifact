let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with synchronous callback', function(done) {
        // Mock function that calls callback synchronously
        function mockSyncFunction(value, callback) {
            callback(null, value * 2);
        }

        q.nfapply(mockSyncFunction, [21])
            .then(function(result) {
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });
});