let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with error callback', function(done) {
        // Create a mock Node.js style callback function that fails
        function mockAsyncFunction(arg1, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }

        q.nfcall(mockAsyncFunction, 'test')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});