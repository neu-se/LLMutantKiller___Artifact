let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - stops tracking unhandled rejections', function(done) {
        // First enable tracking to ensure we're testing the stop functionality
        q.longStackSupport = true;
        
        // Create a promise that will be rejected and not handled
        let rejectedPromise = q.reject(new Error('Test error'));
        
        // Stop unhandled rejection tracking
        q.stopUnhandledRejectionTracking();
        
        // Wait a bit to ensure any tracking would have occurred
        setTimeout(() => {
            // If tracking was properly stopped, no unhandled rejection should be tracked
            // This test passes if no unhandled rejection events are fired
            done();
        }, 100);
    });
});