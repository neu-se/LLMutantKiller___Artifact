let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject - should reject with specified reason when promise rejects', function(done) {
        let rejectedPromise = q.reject(new Error('Original error'));
        let rejectionReason = 'New rejection reason';
        
        q.thenReject(rejectedPromise, rejectionReason)
            .then(function(value) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(reason) {
                assert.strictEqual(reason, rejectionReason);
                done();
            });
    });
});