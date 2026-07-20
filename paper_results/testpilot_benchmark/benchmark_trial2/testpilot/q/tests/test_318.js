let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify', function(done) {
        // Create a mock Node.js-style async function that succeeds
        function mockAsyncSuccess(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `Success: ${arg1} ${arg2}`);
            }, 10);
        }

        // Create a mock Node.js-style async function that fails
        function mockAsyncError(arg, callback) {
            setTimeout(() => {
                callback(new Error(`Error with: ${arg}`));
            }, 10);
        }

        // Test successful denodeify
        const denodeifiedSuccess = q.denodeify(mockAsyncSuccess);
        denodeifiedSuccess('hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'Success: hello world');
                
                // Test error case
                const denodeifiedError = q.denodeify(mockAsyncError);
                return denodeifiedError('test');
            })
            .then(() => {
                // Should not reach here
                assert.fail('Expected promise to be rejected');
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Error with: test');
                done();
            })
            .catch(done);
    });

    })