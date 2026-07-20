let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.tap - should reject if tap callback throws', function(done) {
        let errorMessage = 'tap error';
        
        q.resolve('success')
            .tap(function(value) {
                throw new Error(errorMessage);
            })
            .then(function(result) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, errorMessage, 'should reject with tap callback error');
                done();
            });
    });
});