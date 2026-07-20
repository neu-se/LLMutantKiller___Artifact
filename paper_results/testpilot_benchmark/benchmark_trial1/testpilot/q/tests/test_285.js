let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall', function(done) {
        // Create a mock Node.js-style callback function that succeeds
        function mockAsyncSuccess(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `Success: ${arg1} ${arg2}`);
            }, 10);
        }

        // Create a mock Node.js-style callback function that fails
        function mockAsyncError(arg1, callback) {
            setTimeout(() => {
                callback(new Error(`Error with ${arg1}`));
            }, 10);
        }

        // Test successful case
        q.nfcall(mockAsyncSuccess, "hello", "world")
            .then(result => {
                assert.equal(result, "Success: hello world");
                
                // Test error case
                return q.nfcall(mockAsyncError, "test");
            })
            .then(() => {
                assert.fail("Should have thrown an error");
            })
            .catch(error => {
                assert.equal(error.message, "Error with test");
                
                // Test with no arguments
                function mockNoArgs(callback) {
                    setTimeout(() => {
                        callback(null, "no args result");
                    }, 10);
                }
                
                return q.nfcall(mockNoArgs);
            })
            .then(result => {
                assert.equal(result, "no args result");
                done();
            })
            .catch(done);
    });

    })