let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should work with delayed promise', function(done) {
        let deferred = q.defer();
        let rejectionReason = { message: 'object rejection' };
        
        let thenRejectPromise = deferred.promise.thenReject(rejectionReason);
        
        thenRejectPromise
            .then(function() {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error, rejectionReason);
                done();
            });
        
        // Resolve the original promise after setting up thenReject
        setTimeout(function() {
            deferred.resolve('delayed resolution');
        }, 10);
    });
});