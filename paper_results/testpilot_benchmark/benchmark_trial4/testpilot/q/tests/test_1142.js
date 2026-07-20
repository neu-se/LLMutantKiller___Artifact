let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall with multiple arguments', function(done) {
        // Create a mock Node.js-style async function with multiple args
        function mockAsyncMultiArgs(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, [a, b, c, d].join('-'));
            }, 10);
        }
        
        // Create a promise from the mock function
        let promise = q.makePromise(mockAsyncMultiArgs);
        
        // Test nfcall with multiple arguments
        promise.nfcall('arg1', 'arg2', 'arg3', 'arg4')
            .then(result => {
                assert.strictEqual(result, 'arg1-arg2-arg3-arg4');
                done();
            })
            .catch(done);
    });
});