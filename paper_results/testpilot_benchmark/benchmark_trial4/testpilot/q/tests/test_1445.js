let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons - should track unhandled rejections', function(done) {
        // Clear any existing unhandled rejections
        q.resetUnhandledRejections();
        
        // Create an unhandled rejection
        let promise = q.reject(new Error('test error'));
        
        // Give it a moment for the rejection to be tracked
        setTimeout(() => {
            let reasons = q.getUnhandledReasons();
            assert(Array.isArray(reasons), 'getUnhandledReasons should return an array');
            assert(reasons.length > 0, 'should have unhandled reasons after rejection');
            
            // Clean up by handling the rejection
            promise.catch(() => {});
            done();
        }, 10);
    });
});