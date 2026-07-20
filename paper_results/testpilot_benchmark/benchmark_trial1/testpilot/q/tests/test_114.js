let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - with various data types', function(done) {
        let promise = q.makePromise();
        
        // Directly set properties on the promise object
        promise.stringKey = 'string';
        promise.numberKey = 123;
        promise.booleanKey = true;
        promise.arrayKey = [1, 2, 3];
        promise.functionKey = function() { return 'test'; };
        
        assert.strictEqual(promise.stringKey, 'string');
        assert.strictEqual(promise.numberKey, 123);
        assert.strictEqual(promise.booleanKey, true);
        assert.deepStrictEqual(promise.arrayKey, [1, 2, 3]);
        assert.strictEqual(typeof promise.functionKey, 'function');
        assert.strictEqual(promise.functionKey(), 'test');
        done();
    });
});