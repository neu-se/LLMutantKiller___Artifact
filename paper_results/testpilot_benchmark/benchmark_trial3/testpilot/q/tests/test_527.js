let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should work with already rejected promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        deferred.reject('original rejection');
        
        promise.thenReject('new rejection reason')
            .then(function(value) {
                done(new Error('Should not resolve'));
            })
            .catch(function(reason) {
                // When the original promise is rejected, thenReject should still apply
                assert.strictEqual(reason, 'new rejection reason');
                done();
            });
    });

    })