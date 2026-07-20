let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should handle callback returning rejected promise', function(done) {
        q.resolve('value')
            .tap(function(value) {
                return q.reject(new Error('Callback rejection'));
            })
            .then(function(result) {
                done(new Error('Should not reach success handler'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Callback rejection', 'Should propagate callback rejection');
                done();
            });
    });
});