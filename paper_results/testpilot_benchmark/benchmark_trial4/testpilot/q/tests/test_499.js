let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.tap', function() {
        it('should work with synchronous callback', function(done) {
            let callbackExecuted = false;
            
            q.resolve(42)
                .tap(function(value) {
                    callbackExecuted = true;
                    assert.strictEqual(value, 42);
                })
                .then(function(result) {
                    assert.strictEqual(result, 42, 'Original value should be preserved');
                    assert.strictEqual(callbackExecuted, true, 'Callback should have been executed');
                    done();
                })
                .catch(done);
        });
    });
});