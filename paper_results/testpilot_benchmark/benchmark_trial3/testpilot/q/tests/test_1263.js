let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.nodeify', function() {
        
        it('should call nodeback asynchronously using nextTick', function(done) {
            let promise = q.resolve('test value');
            let callbackCalled = false;
            
            promise.nodeify(function(error, value) {
                callbackCalled = true;
                assert.strictEqual(error, null);
                assert.strictEqual(value, 'test value');
                done();
            });
            
            // Callback should not be called synchronously
            assert.strictEqual(callbackCalled, false);
        });
    });
});