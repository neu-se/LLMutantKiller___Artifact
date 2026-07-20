let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with error callback', function(done) {
        // Create a mock Node.js-style function that calls callback with error
        function nodeStyleFunctionWithError(shouldError, callback) {
            setTimeout(() => {
                if (shouldError) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }
        
        // Denodeify the function
        const promisified = q.denodeify(nodeStyleFunctionWithError);
        
        // Test that it rejects when callback is called with error
        promisified(true)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});