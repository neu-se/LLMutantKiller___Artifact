let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - multiple key-value pairs', function(done) {
        let promise = q.makePromise();
        
        // Test setting multiple key-value pairs
        promise.set('key1', 'value1');
        promise.set('key2', 42);
        promise.set('key3', { nested: 'object' });
        
        // Verify all values were set
        assert.strictEqual(promise.key1, 'value1');
        assert.strictEqual(promise.key2, 42);
        assert.deepStrictEqual(promise.key3, { nested: 'object' });
        done();
    });
});