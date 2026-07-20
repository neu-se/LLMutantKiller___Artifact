let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply with error callback', function(done) {
        // Create a mock function that calls callback with error
        function mockAsyncFunctionWithError(arg1, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        // Use q.nfapply directly with the function and arguments
        q.nfapply(mockAsyncFunctionWithError, ['test'])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});