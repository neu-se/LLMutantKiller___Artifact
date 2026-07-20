let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - basic function binding', function(done) {
        // Create a simple function that takes arguments and returns a promise
        function testFunction(a, b, c) {
            return q.resolve(a + b + c);
        }
        
        // Convert to promise-returning function and bind arguments
        let promiseFunc = q.makePromise(testFunction);
        let boundFunc = promiseFunc.fbind(1, 2);
        
        // Call the bound function with remaining argument
        boundFunc(3).then(function(result) {
            assert.equal(result, 6);
            done();
        }).catch(done);
    });
    
    })