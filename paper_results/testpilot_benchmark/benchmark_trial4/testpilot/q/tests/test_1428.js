let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections - should not affect handled rejections', function(done) {
        // Create a promise that will be rejected but handled
        let promise = q.reject(new Error('Handled error'));
        
        // Handle the rejection
        promise.catch(() => {
            // This should not be affected by resetUnhandledRejections
        });
        
        // Reset unhandled rejections
        q.resetUnhandledRejections();
        
        // Verify the handled promise still works correctly
        promise.catch((error) => {
            assert.equal(error.message, 'Handled error');
            done();
        });
    });
});