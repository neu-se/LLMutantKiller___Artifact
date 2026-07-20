let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - rejects if original promise rejects', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let chainedPromise = promise.thenResolve('should not reach this');
        
        chainedPromise.then(function(value) {
            done(new Error('Should not resolve when original promise rejects'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'original error');
            done();
        });
        
        // Reject the original promise
        deferred.reject(new Error('original error'));
    });
});