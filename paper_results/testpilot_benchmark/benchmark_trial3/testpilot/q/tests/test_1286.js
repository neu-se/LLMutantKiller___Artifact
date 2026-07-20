let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap with callback that throws', function(done) {
        let originalValue = 'test value';
        let tapError = new Error('tap error');
        
        let promise = q.resolve(originalValue);
        
        q.tap(promise, function(value) {
            throw tapError;
        }).then(function(result) {
            done(new Error('Promise should have been rejected due to tap callback error'));
        }).catch(function(err) {
            assert.strictEqual(err, tapError, 'tap callback error should be propagated');
            done();
        });
    });
});