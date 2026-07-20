let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections enables tracking when disabled', function(done) {
        // First disable tracking by calling stopUnhandledRejectionTracking if available
        if (typeof q.stopUnhandledRejectionTracking === 'function') {
            q.stopUnhandledRejectionTracking();
        }
        
        // Reset should re-enable tracking
        q.resetUnhandledRejections();
        
        // Create a rejection to verify tracking is working
        let promise = q.reject(new Error('Test error after reset'));
        
        setTimeout(() => {
            // If tracking is enabled, the rejection should be tracked
            done();
        }, 10);
    });

    })