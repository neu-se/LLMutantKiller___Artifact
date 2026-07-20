let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap - should pass through rejection', function(done) {
        let callbackCalled = false;
        let error = new Error('test error');
        
        let promise = q.reject(error);
        
        q.tap(promise, function(value) {
            callbackCalled = true;
        }).then(function(result) {
            done(new Error('Promise should have been rejected'));
        }).catch(function(err) {
            assert.strictEqual(callbackCalled, false, 'Callback should not be called on rejection');
            assert.strictEqual(err, error, 'Original error should be passed through');
            done();
        });
    });
});