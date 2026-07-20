let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify', function(done) {
        // Create a mock Node.js-style async function that succeeds
        function mockAsyncSuccess(data, callback) {
            setTimeout(() => {
                callback(null, `processed: ${data}`);
            }, 10);
        }

        // Create a mock Node.js-style async function that fails
        function mockAsyncError(data, callback) {
            setTimeout(() => {
                callback(new Error('Mock error occurred'));
            }, 10);
        }

        // Create a mock function with multiple parameters
        function mockAsyncMultiParam(param1, param2, callback) {
            setTimeout(() => {
                callback(null, param1 + param2);
            }, 10);
        }

        // Test successful denodeification
        const denodeifiedSuccess = q.denodeify(mockAsyncSuccess);
        
        denodeifiedSuccess('test data')
            .then(result => {
                assert.strictEqual(result, 'processed: test data');
                
                // Test error handling
                const denodeifiedError = q.denodeify(mockAsyncError);
                return denodeifiedError('test data');
            })
            .then(() => {
                // Should not reach here
                assert.fail('Expected promise to be rejected');
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Mock error occurred');
                
                // Test multiple parameters
                const denodeifiedMulti = q.denodeify(mockAsyncMultiParam);
                return denodeifiedMulti(5, 10);
            })
            .then(result => {
                assert.strictEqual(result, 15);
                done();
            })
            .catch(done);
    });
});