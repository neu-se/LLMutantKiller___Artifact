let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with error callback', function(done) {
        // Mock function that returns an error
        function mockErrorFunction(callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        q.nfcall(mockErrorFunction)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});