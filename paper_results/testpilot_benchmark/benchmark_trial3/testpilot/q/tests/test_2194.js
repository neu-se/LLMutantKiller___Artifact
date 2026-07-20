let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with error callback', function(done) {
        // Create a mock Node.js style callback function that fails
        function mockErrorCallback(arg1, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        q.nfapply(mockErrorCallback, ['test'])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});