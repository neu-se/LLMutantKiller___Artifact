let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with partial argument binding', function(done) {
        // Create a function with multiple parameters
        function multiParamFunction(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }
        
        // Use nbind directly on the original function to bind arguments and convert to promise
        const boundFunction = q.nbind(multiParamFunction, null, 1, 2);
        
        // Test with remaining argument
        boundFunction(3)
            .then(result => {
                assert.strictEqual(result, 6);
                done();
            })
            .catch(done);
    });
});