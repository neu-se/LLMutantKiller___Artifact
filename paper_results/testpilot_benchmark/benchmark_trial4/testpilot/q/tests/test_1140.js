let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall with error', function(done) {
        // Create a mock Node.js-style async function that fails
        function mockAsyncError(arg1, callback) {
            setTimeout(() => {
                callback(new Error(`error with ${arg1}`));
            }, 10);
        }
        
        // Create a promise from the mock function
        let promise = q.makePromise(mockAsyncError);
        
        // Test nfcall with error handling
        promise.nfcall('test')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'error with test');
                done();
            });
    });
    
    })