let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - basic functionality', function(done) {
        let promise = q.makePromise();
        
        // Test setting a key-value pair
        let result = promise.set('testKey', 'testValue');
        
        // Verify the method returns the promise for chaining
        assert.strictEqual(result, promise);
        
        // Verify the value was set (assuming there's a way to retrieve it)
        if (typeof promise.get === 'function') {
            assert.strictEqual(promise.get('testKey'), 'testValue');
        }
        
        done();
    });

    })