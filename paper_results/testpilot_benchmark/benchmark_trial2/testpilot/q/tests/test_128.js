let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - with special characters in key', function(done) {
        let promise = q.makePromise();
        
        // Test keys with special characters - directly assign properties
        promise['key-with-dashes'] = 'value1';
        promise['key_with_underscores'] = 'value2';
        promise['key.with.dots'] = 'value3';
        
        assert.strictEqual(promise['key-with-dashes'], 'value1');
        assert.strictEqual(promise['key_with_underscores'], 'value2');
        assert.strictEqual(promise['key.with.dots'], 'value3');
        done();
    });
});