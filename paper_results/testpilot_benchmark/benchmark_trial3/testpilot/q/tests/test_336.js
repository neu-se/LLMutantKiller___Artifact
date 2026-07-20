let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise without resolve callback', function(done) {
        const descriptor = {
            test: function() {
                return 'no resolve';
            }
        };
        
        const promise = q.makePromise(descriptor);
        
        // Test that it doesn't crash when resolve is null/undefined
        promise.promiseDispatch(null, 'test', []);
        promise.promiseDispatch(undefined, 'test', []);
        done();
    });
});