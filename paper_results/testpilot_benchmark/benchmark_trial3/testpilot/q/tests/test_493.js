let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should work with rejected promises', function(done) {
        let callbackCalled = false;
        
        q.reject(new Error('original error'))
            .tap(function(value) {
                callbackCalled = true;
                return 'should not be called';
            })
            .then(function(result) {
                done(new Error('Should not reach success handler'));
            })
            .catch(function(error) {
                assert.strictEqual(callbackCalled, false, 'Callback should not be called for rejected promises');
                assert.strictEqual(error.message, 'original error', 'Original error should be preserved');
                done();
            });
    });
});