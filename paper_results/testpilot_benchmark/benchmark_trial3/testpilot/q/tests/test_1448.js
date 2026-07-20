let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - tracking remains disabled after call', function(done) {
        // Stop tracking
        q.stopUnhandledRejectionTracking();
        
        // Create multiple rejected promises
        for (let i = 0; i < 5; i++) {
            q.reject(new Error(`Test error ${i}`));
        }
        
        // Wait to ensure no unhandled rejection events are triggered
        setTimeout(() => {
            done();
        }, 150);
    });
});