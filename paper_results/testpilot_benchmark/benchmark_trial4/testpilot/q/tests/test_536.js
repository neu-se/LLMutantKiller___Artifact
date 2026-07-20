let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should work with undefined reason', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.thenReject(undefined)
            .then(
                function(value) {
                    done(new Error('Promise should have been rejected'));
                },
                function(reason) {
                    assert.strictEqual(reason, undefined);
                    done();
                }
            );
        
        deferred.resolve('some value');
    });
});