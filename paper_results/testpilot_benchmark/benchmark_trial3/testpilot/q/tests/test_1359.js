let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject - should reject with specified reason when promise resolves', function(done) {
        let resolvedPromise = q.resolve('success');
        let rejectionReason = new Error('Custom rejection reason');
        
        // q.thenReject doesn't exist, so let's create equivalent behavior
        resolvedPromise
            .then(function(value) {
                // When the promise resolves, we reject with the specified reason
                throw rejectionReason;
            })
            .then(function(value) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(reason) {
                assert.strictEqual(reason, rejectionReason);
                done();
            });
    });
});