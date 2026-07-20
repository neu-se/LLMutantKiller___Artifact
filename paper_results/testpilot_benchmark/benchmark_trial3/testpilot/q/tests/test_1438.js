let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons - should track unhandled rejections', function(done) {
        // Clear any existing unhandled rejections
        q.resetUnhandledRejections();
        
        // Create a rejected promise that won't be handled
        let rejectedPromise = q.reject(new Error('test error'));
        
        // Give it a moment for the unhandled rejection to be tracked
        setTimeout(() => {
            let reasons = q.getUnhandledReasons();
            assert(Array.isArray(reasons), 'getUnhandledReasons should return an array');
            assert(reasons.length > 0, 'should have unhandled reasons after creating rejected promise');
            
            // Clean up by handling the rejection to avoid warnings
            rejectedPromise.catch(() => {});
            done();
        }, 10);
    });
});