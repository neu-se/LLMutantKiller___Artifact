let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with synchronous callback', function(done) {
        // Create a synchronous callback function that expects a callback as the last parameter
        function syncCallback(value, callback) {
            callback(null, value.toUpperCase());
        }
        
        // Convert to promised version
        const promisedCallback = q.promised(syncCallback);
        
        // Test synchronous execution - don't pass a callback, q.promised handles that
        promisedCallback('hello')
            .then(result => {
                assert.strictEqual(result, 'HELLO');
                done();
            })
            .catch(done);
    });
});