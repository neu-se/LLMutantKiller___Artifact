let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with error callback', function(done) {
        // Mock function that returns an error
        function mockErrorFunction(arg, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        q.nfapply(mockErrorFunction, ['test'])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});