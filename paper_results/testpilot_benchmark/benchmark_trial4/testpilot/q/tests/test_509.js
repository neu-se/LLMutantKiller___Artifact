let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should work with rejected promises', function(done) {
        let tapCalled = false;
        let originalError = new Error('original error');
        
        q.reject(originalError)
            .tap(function(value) {
                tapCalled = true;
            })
            .then(function(result) {
                done(new Error('Promise should remain rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(tapCalled, false, 'tap should not be called for rejected promises');
                assert.strictEqual(error, originalError, 'should pass through original rejection');
                done();
            });
    });
});