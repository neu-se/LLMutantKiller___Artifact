let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with error callback', function(done) {
        // Mock Node.js style callback function that fails
        function mockAsyncFunction(shouldFail, callback) {
            setTimeout(() => {
                if (shouldFail) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }

        q.nfcall(mockAsyncFunction, true)
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});