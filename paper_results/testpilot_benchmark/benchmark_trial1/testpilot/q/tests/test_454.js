let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with successful callback', function(done) {
        // Create a simple callback function that takes (err, result) parameters
        function simpleCallback(value, callback) {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        }
        
        // Convert to promise using q.denodeify (q.promised is deprecated)
        const promisedFunction = q.denodeify(simpleCallback);
        
        // Test the promised function
        promisedFunction(5)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });
    
});