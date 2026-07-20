let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - overwriting existing key', function(done) {
        let promise = q.makePromise();
        
        // Set initial value
        promise.set('overwriteKey', 'initialValue');
        assert.strictEqual(promise.overwriteKey, 'initialValue');
        
        // Overwrite with new value
        promise.set('overwriteKey', 'newValue');
        assert.strictEqual(promise.overwriteKey, 'newValue');
        done();
    });
});