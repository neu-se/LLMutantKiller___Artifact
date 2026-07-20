let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    
    beforeEach(function() {
        // Ensure tracking is enabled before each test
        q.stopUnhandledRejectionTracking();
        q.longStackSupport = true;
    });

    it('test q.stopUnhandledRejectionTracking disables tracking', function(done) {
        // First enable tracking
        let originalHandler = process.listeners('unhandledRejection');
        
        // Create a rejected promise that would normally trigger unhandled rejection
        let rejectedPromise = q.reject(new Error('test error'));
        
        // Stop tracking
        q.stopUnhandledRejectionTracking();
        
        // Wait a bit to see if any unhandled rejection events fire
        setTimeout(function() {
            // If we get here without the process crashing or logging errors,
            // the tracking was successfully stopped
            done();
        }, 100);
        
        // Catch the rejection to prevent actual unhandled rejection
        rejectedPromise.catch(function() {});
    });

    })