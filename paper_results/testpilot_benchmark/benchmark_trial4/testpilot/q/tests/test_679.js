let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - edge cases with keys', function(done) {
        let promise = q.makePromise();
        
        // Test with various key types and edge cases
        promise.set('', 'empty string key');
        promise.set('123', 'numeric string key');
        promise.set('special!@#$%^&*()', 'special characters');
        
        if (typeof promise.get === 'function') {
            assert.strictEqual(promise.get(''), 'empty string key');
            assert.strictEqual(promise.get('123'), 'numeric string key');
            assert.strictEqual(promise.get('special!@#$%^&*()'), 'special characters');
        }
        
        done();
    });
});