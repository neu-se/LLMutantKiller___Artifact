let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should reject with undefined', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.thenReject(undefined)
            .then(function(value) {
                done(new Error('Should not resolve'));
            })
            .catch(function(reason) {
                assert.strictEqual(reason, undefined);
                done();
            });
        
        deferred.resolve('original value');
    });

    })