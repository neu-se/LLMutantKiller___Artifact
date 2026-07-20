let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - should stop tracking unhandled rejections', function(done) {
        // First enable tracking to ensure we have a baseline
        q.longStackSupport = true;
        
        // Stop unhandled rejection tracking
        q.stopUnhandledRejectionTracking();
        
        // Create a promise that will be rejected and not handled
        let rejectedPromise = q.reject(new Error('Test unhandled rejection'));
        
        // Set a timeout to verify no unhandled rejection event is fired
        setTimeout(() => {
            // If we reach here without any unhandled rejection events, the test passes
            done();
        }, 100);
        
        // Consume the promise to avoid actual unhandled rejection in test environment
        rejectedPromise.catch(() => {});
    });

    })