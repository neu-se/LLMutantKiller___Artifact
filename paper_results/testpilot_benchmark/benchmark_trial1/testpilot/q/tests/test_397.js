let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - stops tracking unhandled rejections', function(done) {
        // First enable tracking to ensure we have a clean starting state
        q.longStackSupport = true;
        
        // Create a promise that will be rejected and not handled
        let promise = q.reject(new Error('Test error'));
        
        // Stop unhandled rejection tracking
        q.stopUnhandledRejectionTracking();
        
        // Wait a bit to ensure any potential unhandled rejection events would have fired
        setTimeout(() => {
            // If tracking was properly stopped, we shouldn't get unhandled rejection events
            // This test passes if no unhandled rejection error is thrown
            done();
        }, 50);
    });

    })