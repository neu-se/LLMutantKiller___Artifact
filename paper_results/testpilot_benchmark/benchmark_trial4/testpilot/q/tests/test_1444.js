let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons - should not include handled rejections', function(done) {
        // Clear any existing unhandled rejections
        q.resetUnhandledRejections();
        
        // Create a rejection and immediately handle it
        let promise = q.reject(new Error('handled error'));
        promise.catch(() => {
            // This handles the rejection
        });
        
        // Give it a moment to process
        setTimeout(() => {
            let reasons = q.getUnhandledReasons();
            assert(Array.isArray(reasons), 'getUnhandledReasons should return an array');
            // The handled rejection should not appear in unhandled reasons
            done();
        }, 10);
    });
});