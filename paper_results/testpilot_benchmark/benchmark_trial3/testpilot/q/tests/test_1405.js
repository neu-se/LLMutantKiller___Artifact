let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections - should be callable multiple times', function(done) {
        // Test that resetUnhandledRejections can be called multiple times safely
        try {
            q.resetUnhandledRejections();
            q.resetUnhandledRejections();
            q.resetUnhandledRejections();
            
            // If we get here without throwing, the test passes
            assert.ok(true, 'resetUnhandledRejections can be called multiple times');
            done();
        } catch (error) {
            done(error);
        }
    });

    })