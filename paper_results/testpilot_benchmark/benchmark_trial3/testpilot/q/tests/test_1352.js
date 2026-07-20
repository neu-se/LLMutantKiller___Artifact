let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject with string reason', function(done) {
        let resolvedPromise = q.resolve(42);
        let rejectionReason = 'string error message';
        
        q.thenReject(resolvedPromise, rejectionReason)
            .then(function(value) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error, rejectionReason);
                done();
            });
    });
});