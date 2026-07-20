let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with synchronous callback', function(done) {
        // Create a synchronous callback
        function syncCallback(value, callback) {
            callback(null, value.toUpperCase());
        }
        
        // Convert to promised version
        const promisedCallback = q.promised(syncCallback);
        
        // Test synchronous execution - only pass the value, not the callback
        promisedCallback('hello')
            .then(result => {
                assert.equal(result, 'HELLO');
                done();
            })
            .catch(done);
    });
});