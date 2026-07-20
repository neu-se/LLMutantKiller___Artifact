let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should call callback and pass through original value', function(done) {
        let callbackCalled = false;
        let callbackValue = null;
        
        q.resolve(42)
            .tap(function(value) {
                callbackCalled = true;
                callbackValue = value;
                return 'ignored';
            })
            .then(function(result) {
                assert.strictEqual(callbackCalled, true, 'Callback should have been called');
                assert.strictEqual(callbackValue, 42, 'Callback should receive original value');
                assert.strictEqual(result, 42, 'Original value should be passed through');
                done();
            })
            .catch(done);
    });

    })