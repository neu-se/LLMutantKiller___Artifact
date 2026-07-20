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
        
        // Create a promise from the mock function
        let promise = q.nfcall(mockAsyncSuccess, "hello", "world");
        
        promise
            .then(result => {
                assert.equal(result, "success: hello world");
                
                // If you want to test another nfcall, do it separately
                return q.nfcall(mockAsyncSuccess, "test", "args");
            })
            .then(result => {
                assert.equal(result, "success: test args");
                done();
            })
            .catch(done);
    });
});