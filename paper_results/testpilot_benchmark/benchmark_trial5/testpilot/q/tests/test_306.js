let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify', function(done) {
        // Create a mock Node.js-style callback function that succeeds
        function mockAsyncSuccess(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `success: ${arg1} ${arg2}`);
            }, 10);
        }

        // Create a mock Node.js-style callback function that fails
        function mockAsyncError(arg1, callback) {
            setTimeout(() => {
                callback(new Error(`error: ${arg1}`));
            }, 10);
        }

        // Create a promise to test the denodeify method on
        let testPromise = q.resolve();

        // Test successful case
        let denodeifiedSuccess = testPromise.denodeify(mockAsyncSuccess);
        
        denodeifiedSuccess('hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'success: hello world');
                
                // Test error case
                let denodeifiedError = testPromise.denodeify(mockAsyncError);
                return denodeifiedError('test');
            })
            .then(() => {
                // Should not reach here
                assert.fail('Expected promise to reject');
            })
            .catch(error => {
                assert.strictEqual(error.message, 'error: test');
                
                // Test with no additional arguments
                function mockSimple(callback) {
                    setTimeout(() => callback(null, 'simple result'), 10);
                }
                
                let denodeifiedSimple = testPromise.denodeify(mockSimple);
                return denodeifiedSimple();
            })
            .then(result => {
                assert.strictEqual(result, 'simple result');
                done();
            })
            .catch(done);
    });

    })