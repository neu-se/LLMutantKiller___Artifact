let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.tap - should call callback and pass through value', function(done) {
        let callbackCalled = false;
        let callbackValue = null;
        
        let promise = q.resolve(42);
        
        q.tap(promise, function(value) {
            callbackCalled = true;
            callbackValue = value;
        }).then(function(result) {
            assert.strictEqual(callbackCalled, true, 'Callback should have been called');
            assert.strictEqual(callbackValue, 42, 'Callback should receive the promise value');
            assert.strictEqual(result, 42, 'Original value should be passed through');
            done();
        }).catch(done);
    });
});