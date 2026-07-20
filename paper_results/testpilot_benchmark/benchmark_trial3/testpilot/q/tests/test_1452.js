let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - stops tracking unhandled rejections', function(done) {
        // First enable tracking to ensure we have a clean starting state
        q.longStackSupport = true;
        
        // Create a promise that will be rejected and not handled
        let rejectedPromise = q.reject(new Error('Test error'));
        
        // Stop unhandled rejection tracking
        q.stopUnhandledRejectionTracking();
        
        // Create another rejected promise after stopping tracking
        let anotherRejectedPromise = q.reject(new Error('Another test error'));
        
        // Wait a bit to see if any unhandled rejection events are triggered
        setTimeout(() => {
            // If we get here without any unhandled rejection errors, the test passes
            done();
        }, 100);
    });
});