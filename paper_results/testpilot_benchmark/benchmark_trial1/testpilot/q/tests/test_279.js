let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall', function(done) {
        // Create a mock Node.js-style async function that succeeds
        function mockAsyncSuccess(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `success: ${arg1} ${arg2}`);
            }, 10);
        }

        // Use q.nfcall directly to create a promise from the mock function
        let promise = q.nfcall(mockAsyncSuccess, "test", "args");
        
        // Test that nfcall returns a promise and resolves correctly
        promise
            .then(result => {
                assert.strictEqual(result, "success: test args");
                done();
            })
            .catch(done);
    });
});