let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.stopUnhandledRejectionTracking - function exists and is callable', function(done) {
        // Verify the function exists
        assert(typeof q.stopUnhandledRejectionTracking === 'function', 
               'stopUnhandledRejectionTracking should be a function');
        
        // Verify it can be called without throwing
        assert.doesNotThrow(() => {
            q.stopUnhandledRejectionTracking();
        }, 'stopUnhandledRejectionTracking should not throw when called');
        
        done();
    });

    })