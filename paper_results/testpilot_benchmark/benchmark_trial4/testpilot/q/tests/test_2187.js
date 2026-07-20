let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with synchronous callback', function(done) {
        // Create a synchronous callback
        function syncCallback(value, callback) {
            callback(null, value * 2);
        }
        
        q.nfapply(syncCallback, [21])
            .then(result => {
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });
});