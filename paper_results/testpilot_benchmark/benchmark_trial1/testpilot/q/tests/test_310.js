let mocha = require('mocha');
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

        // Create a mock function with multiple arguments
        function mockAsyncMultiArgs(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }

        // Test successful denodeification
        const denodeifiedSuccess = q.denodeify(mockAsyncSuccess);
        const denodeifiedError = q.denodeify(mockAsyncError);
        const denodeifiedMultiArgs = q.denodeify(mockAsyncMultiArgs);

        let testsCompleted = 0;
        const totalTests = 3;

        function checkCompletion() {
            testsCompleted++;
            if (testsCompleted === totalTests) {
                done();
            }
        }

        // Test 1: Successful promise resolution
        denodeifiedSuccess('test data')
            .then(result => {
                assert.strictEqual(result, 'processed: test data');
                checkCompletion();
            })
            .catch(err => {
                done(err);
            });

        // Test 2: Promise rejection on error
        denodeifiedError('test data')
            .then(result => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Mock error occurred');
                checkCompletion();
            });

        // Test 3: Multiple arguments
        denodeifiedMultiArgs(5, 10)
            .then(result => {
                assert.strictEqual(result, 15);
                checkCompletion();
            })
            .catch(err => {
                done(err);
            });
    });

    })