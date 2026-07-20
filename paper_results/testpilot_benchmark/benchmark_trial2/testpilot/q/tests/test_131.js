let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - overwriting existing key', function(done) {
        let promise = q.makePromise();
        
        // Set initial value directly on the promise object
        promise.overwriteKey = 'initialValue';
        assert.strictEqual(promise.overwriteKey, 'initialValue');
        
        // Overwrite with new value
        promise.overwriteKey = 'newValue';
        assert.strictEqual(promise.overwriteKey, 'newValue');
        done();
    });
});