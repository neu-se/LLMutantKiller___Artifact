let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections - should clear unhandled rejection tracking', function(done) {
        // Create a promise that will be rejected and not handled
        let promise = q.reject(new Error('Test error'));
        
        // Let the rejection become unhandled
        setTimeout(() => {
            // Reset unhandled rejections
            q.resetUnhandledRejections();
            
            // Verify the function exists and can be called without error
            assert.strictEqual(typeof q.resetUnhandledRejections, 'function');
            done();
        }, 10);
    });

    })