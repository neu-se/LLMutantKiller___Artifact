let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall', function(done) {
        // Create a mock Node.js style callback function that succeeds
        function mockAsyncSuccess(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `Success: ${arg1} ${arg2}`);
            }, 10);
        }

        // Create a mock Node.js style callback function that fails
        function mockAsyncError(arg1, callback) {
            setTimeout(() => {
                callback(new Error(`Error with ${arg1}`));
            }, 10);
        }

        // Create a mock function with no additional arguments
        function mockAsyncNoArgs(callback) {
            setTimeout(() => {
                callback(null, 'No args result');
            }, 10);
        }

        // Test 1: Successful call with multiple arguments
        q.nfcall(mockAsyncSuccess, 'hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'Success: hello world');
                
                // Test 2: Error case
                return q.nfcall(mockAsyncError, 'test');
            })
            .then(() => {
                assert.fail('Should have thrown an error');
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Error with test');
                
                // Test 3: No additional arguments
                return q.nfcall(mockAsyncNoArgs);
            })
            .then(result => {
                assert.strictEqual(result, 'No args result');
                
                // Test 4: Function that returns multiple values (all values are preserved in an array)
                function mockMultipleValues(callback) {
                    setTimeout(() => {
                        callback(null, 'first', 'second', 'third');
                    }, 10);
                }
                
                return q.nfcall(mockMultipleValues);
            })
            .then(result => {
                assert.deepStrictEqual(result, ['first', 'second', 'third']);
                done();
            })
            .catch(done);
    });

})