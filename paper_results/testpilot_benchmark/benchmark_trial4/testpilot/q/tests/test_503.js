let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should propagate callback errors', function(done) {
        q.resolve('value')
            .tap(function(value) {
                throw new Error('Callback error');
            })
            .then(function(result) {
                done(new Error('Should not reach this point'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Callback error', 'Should propagate callback error');
                done();
            });
    });
});