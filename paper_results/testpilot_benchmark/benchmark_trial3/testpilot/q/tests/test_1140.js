let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall', function(done) {
        // Create a mock Node.js-style async function that succeeds
        function mockAsyncSuccess(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `success: ${arg1} ${arg2}`);
            }, 10);
        }
        
        // Create a promise from the mock function
        let promise = q.nfcall(mockAsyncSuccess, "hello", "world");
        
        promise.nfcall("test", "args")
            .then(result => {
                assert.equal(result, "success: test args");
                done();
            })
            .catch(done);
    });
    
    })