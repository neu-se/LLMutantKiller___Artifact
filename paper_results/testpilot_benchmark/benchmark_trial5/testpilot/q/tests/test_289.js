let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall', function(done) {
        // Create a mock Node.js-style async function that succeeds
        function mockAsyncSuccess(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `success: ${arg1} ${arg2}`);
            }, 10);
        }

        // Test nfcall with the mock function and arguments
        q.nfcall(mockAsyncSuccess, 'hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'success: hello world');
                done();
            })
            .catch(done);
    });
});