let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with synchronous callback', function(done) {
        // Create a mock function that calls callback synchronously
        function syncNodeFunction(value, callback) {
            callback(null, value.toUpperCase());
        }
        
        // Denodeify the function
        const promisified = q.denodeify(syncNodeFunction);
        
        // Test that it works with synchronous callbacks too
        promisified('hello')
            .then(result => {
                assert.strictEqual(result, 'HELLO');
                done();
            })
            .catch(done);
    });
});