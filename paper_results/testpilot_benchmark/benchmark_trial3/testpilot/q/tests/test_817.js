let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - basic functionality', function(done) {
        // Create a simple function that takes arguments and returns a value
        function testFunction(a, b, c) {
            return a + b + c;
        }
        
        // Create a promise-returning function using q.fcall
        let promiseFunction = function() {
            return q.fcall(testFunction, arguments[0], arguments[1], arguments[2]);
        };
        
        // Use fbind to create a new function with some arguments pre-bound
        let boundFunction = q.fbind(testFunction, 1, 2);
        
        // Call the bound function with remaining argument
        boundFunction(3)
            .then(function(result) {
                assert.equal(result, 6); // 1 + 2 + 3 = 6
                done();
            })
            .catch(done);
    });
});