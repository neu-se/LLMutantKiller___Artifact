let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with error callback', function(done) {
        // Create a mock function that calls back with an error
        function mockAsyncFunctionWithError(arg, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        q.nfcall(mockAsyncFunctionWithError, 'test')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Test error');
                done();
            });
    });
});