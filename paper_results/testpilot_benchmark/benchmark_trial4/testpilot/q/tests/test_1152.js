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

        // Test successful case with multiple arguments
        let promise1 = q.makePromise.prototype.nfcall.call(q.defer().promise, mockAsyncSuccess, "hello", "world");
        
        promise1.then(result => {
            assert.equal(result, "Success: hello world");
            
            // Test error case
            let promise2 = q.makePromise.prototype.nfcall.call(q.defer().promise, mockAsyncError, "test");
            
            return promise2.catch(error => {
                assert.equal(error.message, "Error with test");
                done();
            });
        }).catch(done);
    });

    })