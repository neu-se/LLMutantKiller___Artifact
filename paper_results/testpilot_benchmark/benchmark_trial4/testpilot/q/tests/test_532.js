let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - resolves with specified value', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let resolvedPromise = promise.thenResolve('test value');
        
        resolvedPromise.then(function(value) {
            assert.strictEqual(value, 'test value');
            done();
        }).catch(done);
        
        deferred.resolve('original value');
    });
});