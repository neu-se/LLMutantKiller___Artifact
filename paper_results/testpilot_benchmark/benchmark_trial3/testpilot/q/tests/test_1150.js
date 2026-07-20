let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall - error callback', function(done) {
        // Create a mock function that calls back with an error
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