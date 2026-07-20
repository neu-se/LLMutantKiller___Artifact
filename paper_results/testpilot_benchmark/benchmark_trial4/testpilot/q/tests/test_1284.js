let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap - should handle callback that returns a promise', function(done) {
        let sideEffectValue = null;
        
        let promise = q.resolve('original');
        
        q.tap(promise, function(value) {
            sideEffectValue = value;
            return q.delay(10).then(function() {
                return 'callback result';
            });
        }).then(function(result) {
            assert.strictEqual(sideEffectValue, 'original', 'Callback should receive original value');
            assert.strictEqual(result, 'original', 'Original value should be passed through even when callback returns promise');
            done();
        }).catch(done);
    });
});