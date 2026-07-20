let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should reject with Error object', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let testError = new Error('custom error message');
        
        promise.thenReject(testError)
            .then(function(value) {
                done(new Error('Should not resolve'));
            })
            .catch(function(reason) {
                assert.strictEqual(reason, testError);
                assert.strictEqual(reason.message, 'custom error message');
                done();
            });
        
        deferred.resolve('original value');
    });
});