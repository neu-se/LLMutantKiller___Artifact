let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise exception handling', function(done) {
        const descriptor = {
            throwError: function() {
                throw new Error('descriptor error');
            }
        };
        
        const promise = q.makePromise(descriptor);
        
        // Test that exceptions are caught and rejected
        promise.promiseDispatch(function(result) {
            // The result should be a rejected promise
            assert(result && typeof result.then === 'function');
            done();
        }, 'throwError', []).catch(function(error) {
            // Handle the expected error
            assert(error instanceof Error);
            assert.equal(error.message, 'descriptor error');
            done();
        });
    });
});