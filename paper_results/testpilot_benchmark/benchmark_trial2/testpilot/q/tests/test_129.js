let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - returns promise for chaining', function(done) {
        let promise = q.makePromise();
        
        // Test that set returns a promise (not necessarily the same instance)
        let result = promise.set('chainKey', 'chainValue');
        
        // Check that result is a promise-like object
        assert(typeof result.then === 'function', 'set should return a promise-like object');
        
        // Check that the property was set on the original promise
        assert.strictEqual(promise.chainKey, 'chainValue');
        
        done();
    });
});