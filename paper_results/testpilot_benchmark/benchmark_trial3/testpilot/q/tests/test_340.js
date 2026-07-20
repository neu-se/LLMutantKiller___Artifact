let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with default fallback', function(done) {
        const descriptor = {};
        
        const promise = q.makePromise(descriptor);
        
        // Test default fallback behavior
        promise.promiseDispatch(function(result) {
            // Should get a rejected promise with appropriate error message
            assert(result && typeof result.then === 'function');
            done();
        }, 'nonexistent', []);
    });
});