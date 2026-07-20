let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons - should handle multiple unhandled rejections', function(done) {
        // Clear any existing unhandled rejections
        q.resetUnhandledRejections();
        
        // Create multiple unhandled rejections
        let promise1 = q.reject(new Error('error 1'));
        let promise2 = q.reject(new Error('error 2'));
        
        setTimeout(() => {
            let reasons = q.getUnhandledReasons();
            assert(Array.isArray(reasons), 'getUnhandledReasons should return an array');
            assert(reasons.length >= 2, 'should track multiple unhandled rejections');
            
            // Clean up
            promise1.catch(() => {});
            promise2.catch(() => {});
            done();
        }, 10);
    });
});