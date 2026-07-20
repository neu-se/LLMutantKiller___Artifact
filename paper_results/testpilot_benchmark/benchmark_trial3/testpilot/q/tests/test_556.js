let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isPending - should return false for rejected promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        deferred.reject(new Error('test error'));
        
        // Use setTimeout to ensure promise state has been updated
        setTimeout(() => {
            assert.strictEqual(promise.isPending(), false);
            done();
        }, 0);
    });
});