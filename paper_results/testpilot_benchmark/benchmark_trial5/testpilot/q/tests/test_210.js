let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - basic functionality', function(done) {
        // Create a simple function that takes arguments and returns a value
        function testFunction(a, b, c) {
            return a + b + c;
        }
        
        // Convert to promise-returning function using q.denodeify or q.nfbind
        let promiseFunction = q.denodeify(function(a, b, c, callback) {
            try {
                let result = testFunction(a, b, c);
                callback(null, result);
            } catch (err) {
                callback(err);
            }
        });
        
        // Use fbind to create a new function with some arguments pre-bound
        let boundFunction = promiseFunction.fbind(null, 1, 2);
        
        // Call the bound function with remaining argument
        boundFunction(3)
            .then(function(result) {
                assert.equal(result, 6); // 1 + 2 + 3 = 6
                done();
            })
            .catch(done);
    });
});