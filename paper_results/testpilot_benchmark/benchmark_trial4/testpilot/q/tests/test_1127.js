let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with error callback', function(done) {
        // Create a mock function that calls callback with error
        function mockAsyncFunction(shouldError, callback) {
            setTimeout(() => {
                if (shouldError) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }
        
        // Use q.nfapply to promisify and call the function
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