let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with error', function(done) {
        // Create a mock Node.js-style async function that fails
        function mockAsyncError(arg1, callback) {
            setTimeout(() => {
                callback(new Error(`error with ${arg1}`));
            }, 10);
        }
        
        let promise = q.nfcall(mockAsyncError, "test");
        
        promise
            .then(() => {
                done(new Error("Should have rejected"));
            })
            .catch(error => {
                assert.equal(error.message, "error with test");
                done();
            });
    });
});