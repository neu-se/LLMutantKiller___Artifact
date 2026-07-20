let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify - synchronous callback', function(done) {
        // Create a function that calls the callback synchronously
        function syncFunction(value, callback) {
            callback(null, value + 10);
        }
        
        const promisified = q.denodeify(syncFunction);
        
        promisified(5)
            .then(result => {
                assert.strictEqual(result, 15);
                done();
            })
            .catch(done);
    });
});