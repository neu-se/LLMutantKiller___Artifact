let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply with successful callback', function(done) {
        // Create a mock function that follows Node.js callback convention
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        // Create a promise using makePromise
        const promisifiedFunction = q.makePromise(mockAsyncFunction);
        
        // Test nfapply with arguments array
        promisifiedFunction.nfapply([5, 3])
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
    
    })