let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should reject with string reason', function(done) {
        let resolvedPromise = q.resolve(42);
        let rejectionReason = 'string rejection reason';
        
        resolvedPromise.thenReject(rejectionReason)
            .then(function() {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error, rejectionReason);
                done();
            });
    });
});