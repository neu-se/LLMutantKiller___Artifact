let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - with various data types', function(done) {
        let promise = q.makePromise();
        
        // Test with different data types
        promise.set('stringKey', 'string');
        promise.set('numberKey', 123);
        promise.set('booleanKey', true);
        promise.set('arrayKey', [1, 2, 3]);
        promise.set('functionKey', function() { return 'test'; });
        
        assert.strictEqual(promise.stringKey, 'string');
        assert.strictEqual(promise.numberKey, 123);
        assert.strictEqual(promise.booleanKey, true);
        assert.deepStrictEqual(promise.arrayKey, [1, 2, 3]);
        assert.strictEqual(typeof promise.functionKey, 'function');
        assert.strictEqual(promise.functionKey(), 'test');
        done();
    });
});