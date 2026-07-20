let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.tap', function() {
        it('should not be called when the original promise is rejected', function(done) {
            let callbackCalled = false;
            
            q.reject(new Error('original error'))
                .tap(function(value) {
                    callbackCalled = true;
                })
                .then(function(result) {
                    done(new Error('Promise should have been rejected'));
                })
                .catch(function(error) {
                    assert.strictEqual(callbackCalled, false, 'Callback should not be called for rejections');
                    assert.strictEqual(error.message, 'original error');
                    done();
                });
        });

            })
})