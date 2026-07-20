let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - resolves with undefined', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let resolvedPromise = promise.thenResolve(undefined);
        
        resolvedPromise.then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(done);
        
        deferred.resolve('original value');
    });
});