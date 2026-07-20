let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall - successful callback', function(done) {
        // Create a mock function that follows Node.js callback convention
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        // Use q.nfcall directly to call the function and get a promise
        q.nfcall(mockAsyncFunction, 5, 3)
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});