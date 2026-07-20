let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - basic functionality', function(done) {
        let promise = q.makePromise();
        
        // Test setting a key-value pair
        let result = promise.set('testKey', 'testValue');
        
        // Verify the method returns a promise (but not necessarily the same instance)
        assert(q.isPromise(result), 'set method should return a promise');
        
        // Verify the value was set (assuming there's a way to retrieve it)
        if (typeof promise.get === 'function') {
            assert.strictEqual(promise.get('testKey'), 'testValue');
        }
        
        done();
    });
});