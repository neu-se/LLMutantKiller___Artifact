let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections - should be callable multiple times', function(done) {
        try {
            // Should not throw when called multiple times
            q.resetUnhandledRejections();
            q.resetUnhandledRejections();
            q.resetUnhandledRejections();
            
            assert.ok(true, 'Multiple calls to resetUnhandledRejections succeeded');
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })