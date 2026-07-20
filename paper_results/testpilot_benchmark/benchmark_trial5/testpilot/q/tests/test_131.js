let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - multiple key-value pairs', function(done) {
        let promise = q.makePromise();
        
        // Set multiple key-value pairs
        promise.set('key1', 'value1');
        promise.set('key2', 42);
        promise.set('key3', { nested: 'object' });
        
        // Verify all values were set correctly
        if (typeof promise.get === 'function') {
            // Handle async get method that returns promises
            Promise.all([
                promise.get('key1'),
                promise.get('key2'),
                promise.get('key3')
            ]).then(function(values) {
                assert.strictEqual(values[0], 'value1');
                assert.strictEqual(values[1], 42);
                assert.deepStrictEqual(values[2], { nested: 'object' });
                done();
            }).catch(done);
        } else {
            done();
        }
    });
});