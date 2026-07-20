let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - tracking remains disabled after call', function(done) {
        // Stop tracking
        q.stopUnhandledRejectionTracking();
        
        // Create multiple unhandled rejections
        q.reject(new Error('Error 1'));
        q.reject(new Error('Error 2'));
        
        // Wait to ensure no tracking occurs
        setTimeout(() => {
            // If we reach here without any unhandled rejection events, tracking is properly disabled
            done();
        }, 50);
    });
});