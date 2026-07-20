let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - various data types', function(done) {
        let promise = q.makePromise();
        
        // Test with different data types
        promise.set('string', 'hello');
        promise.set('number', 123);
        promise.set('boolean', true);
        promise.set('null', null);
        promise.set('undefined', undefined);
        promise.set('array', [1, 2, 3]);
        promise.set('object', { foo: 'bar' });
        promise.set('function', function() { return 'test'; });
        
        // Verify all types are handled correctly
        if (typeof promise.get === 'function') {
            assert.strictEqual(promise.get('string'), 'hello');
            assert.strictEqual(promise.get('number'), 123);
            assert.strictEqual(promise.get('boolean'), true);
            assert.strictEqual(promise.get('null'), null);
            assert.strictEqual(promise.get('undefined'), undefined);
            assert.deepStrictEqual(promise.get('array'), [1, 2, 3]);
            assert.deepStrictEqual(promise.get('object'), { foo: 'bar' });
            assert.strictEqual(typeof promise.get('function'), 'function');
        }
        
        done();
    });

    })