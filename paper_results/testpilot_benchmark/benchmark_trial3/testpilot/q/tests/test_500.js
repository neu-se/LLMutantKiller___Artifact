let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should work with rejected promises', function(done) {
        let tapCalled = false;
        let originalError = new Error('original error');
        
        q.reject(originalError)
            .tap(function(value) {
                tapCalled = true; // This should not be called
            })
            .then(function(value) {
                done(new Error('Promise should have remained rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(tapCalled, false, 'tap should not be called on rejected promise');
                assert.strictEqual(error, originalError, 'original error should pass through');
                done();
            });
    });
});