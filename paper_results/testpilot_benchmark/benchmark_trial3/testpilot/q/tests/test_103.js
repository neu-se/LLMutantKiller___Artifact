let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - reject with reason', function(done) {
        const deferred = q.defer();
        const testError = new Error('test error');
        
        deferred.promise.then(function() {
            done(new Error('Promise should not be resolved'));
        }).catch(function(reason) {
            assert.equal(reason, testError, 'rejection reason should match');
            assert.equal(deferred.promise.inspect().state, 'rejected', 'promise should be rejected');
            done();
        });
        
        deferred.reject(testError);
    });
});