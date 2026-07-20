let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - works when original promise rejects', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let resolvedPromise = promise.thenResolve('success value');
        
        resolvedPromise.then(function(value) {
            assert.strictEqual(value, 'success value');
            done();
        }).catch(done);
        
        deferred.reject(new Error('original error'));
    });
});