let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with multiple parameters', function(done) {
        // Create a callback function that takes multiple parameters
        function multiParamCallback(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }
        
        // Convert to promise using q.denodeify
        const promisedFunction = q.denodeify(multiParamCallback);
        
        // Test with multiple parameters
        promisedFunction(1, 2, 3)
            .then(result => {
                assert.strictEqual(result, 6);
                done();
            })
            .catch(done);
    });
    
})