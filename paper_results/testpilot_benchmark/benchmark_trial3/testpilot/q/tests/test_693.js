let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - basic functionality', function(done) {
        let promise = q.makePromise();
        
        // Test setting a key-value pair
        promise.set('testKey', 'testValue');
        
        // Verify the value was set (assuming there's a way to retrieve it)
        assert.strictEqual(promise.testKey, 'testValue');
        done();
    });
});