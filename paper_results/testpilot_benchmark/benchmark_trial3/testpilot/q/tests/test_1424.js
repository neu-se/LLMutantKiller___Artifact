let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons - should not include handled rejections', function(done) {
        // Clear any existing unhandled rejections
        q.resetUnhandledRejections();
        
        // Create a rejected promise and handle it immediately
        let rejectedPromise = q.reject(new Error('handled error'));
        rejectedPromise.catch(() => {
            // This rejection is handled
        });
        
        // Give it a moment to process
        setTimeout(() => {
            let reasons = q.getUnhandledReasons();
            assert(Array.isArray(reasons), 'getUnhandledReasons should return an array');
            // The handled rejection should not appear in unhandled reasons
            let hasHandledError = reasons.some(reason => 
                reason && reason.message === 'handled error'
            );
            assert(!hasHandledError, 'handled rejections should not appear in unhandled reasons');
            done();
        }, 10);
    });

    })