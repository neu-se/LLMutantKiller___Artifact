let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should handle callback that returns a promise', function(done) {
        let callbackCalled = false;
        
        q.resolve('test')
            .tap(function(value) {
                callbackCalled = true;
                return q.delay(10).then(() => 'async result');
            })
            .then(function(result) {
                assert.strictEqual(callbackCalled, true, 'Callback should have been called');
                assert.strictEqual(result, 'test', 'Original value should be passed through even with async callback');
                done();
            })
            .catch(done);
    });

    })