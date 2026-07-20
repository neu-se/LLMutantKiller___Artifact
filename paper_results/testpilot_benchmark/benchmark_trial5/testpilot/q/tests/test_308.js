let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify', function(done) {
        // Create a mock Node.js-style callback function that succeeds
        function mockAsyncSuccess(data, callback) {
            setTimeout(() => {
                callback(null, `processed: ${data}`);
            }, 10);
        }

        // Create a mock Node.js-style callback function that fails
        function mockAsyncError(data, callback) {
            setTimeout(() => {
                callback(new Error('Mock error occurred'));
            }, 10);
        }

        // Test successful denodeify
        const denodeifiedSuccess = q.denodeify(mockAsyncSuccess);
        
        denodeifiedSuccess('test data')
            .then(result => {
                assert.strictEqual(result, 'processed: test data');
                
                // Test error case
                const denodeifiedError = q.denodeify(mockAsyncError);
                return denodeifiedError('test data');
            })
            .then(() => {
                // Should not reach here
                assert.fail('Expected promise to be rejected');
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Mock error occurred');
                done();
            })
            .catch(done);
    });

    })