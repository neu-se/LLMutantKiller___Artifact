let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply with error callback', function(done) {
        // Create a mock function that calls callback with error
        function mockAsyncFunction(shouldFail, callback) {
            setTimeout(() => {
                if (shouldFail) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }
        
        // Use q.nfapply directly with the original function
        q.nfapply(mockAsyncFunction, [true])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});