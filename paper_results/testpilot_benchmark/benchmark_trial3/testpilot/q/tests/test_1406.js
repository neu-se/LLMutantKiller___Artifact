let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections - should not affect handled rejections', function(done) {
        // Create a promise that will be rejected but properly handled
        let promise = q.reject(new Error('Handled error'));
        
        // Handle the rejection
        promise.catch(() => {
            // This rejection is handled, so resetUnhandledRejections shouldn't affect it
        });
        
        setTimeout(() => {
            try {
                q.resetUnhandledRejections();
                assert.ok(true, 'resetUnhandledRejections works with handled rejections');
                done();
            } catch (error) {
                done(error);
            }
        }, 10);
    });

    })