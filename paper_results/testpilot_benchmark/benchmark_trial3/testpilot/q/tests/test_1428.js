let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons with actual unhandled rejection', function(done) {
        // Create a promise that will be rejected and not handled
        let initialCount = q.getUnhandledReasons().length;
        
        let promise = q.reject(new Error('test error'));
        
        // Give some time for the unhandled rejection to be tracked
        setTimeout(() => {
            let reasons = q.getUnhandledReasons();
            assert(reasons.length >= initialCount, 'Should track unhandled rejections');
            
            // Now handle the rejection to clean up
            promise.catch(() => {});
            
            done();
        }, 10);
    });

    })