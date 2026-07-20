let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with no resolve callback', function(done) {
        const descriptor = {
            test: function() {
                return 'no resolve test';
            }
        };
        
        const promise = q.makePromise(descriptor);
        
        // Test promiseDispatch without resolve callback (should not throw)
        try {
            promise.promiseDispatch(null, 'test', []);
            done();
        } catch (e) {
            done(e);
        }
    });
});