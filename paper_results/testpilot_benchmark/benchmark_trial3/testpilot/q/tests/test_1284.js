let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap with callback returning a promise', function(done) {
        let tappedValue = null;
        let originalValue = 'original';
        let sideEffectValue = 'side effect';
        
        let promise = q.resolve(originalValue);
        
        q.tap(promise, function(value) {
            tappedValue = value;
            return q.resolve(sideEffectValue); // This return value should be ignored
        }).then(function(result) {
            assert.strictEqual(tappedValue, originalValue, 'tap callback should receive the original value');
            assert.strictEqual(result, originalValue, 'tap should pass through the original value, not the callback return value');
            done();
        }).catch(done);
    });
});