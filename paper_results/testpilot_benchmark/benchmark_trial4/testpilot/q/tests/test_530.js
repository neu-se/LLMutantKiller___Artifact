let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - resolves with null', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let resolvedPromise = promise.thenResolve(null);
        
        resolvedPromise.then(function(value) {
            assert.strictEqual(value, null);
            done();
        }).catch(done);
        
        deferred.resolve('original value');
    });
});