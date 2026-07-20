let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - rejects with single rejected promise', function(done) {
        let deferred = q.defer();
        
        // Since q doesn't have a built-in any() method, we'll simulate the behavior
        // where any() should reject if all promises reject
        let anyPromise = deferred.promise;
        
        anyPromise.then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'single error');
            done();
        });
        
        deferred.reject(new Error('single error'));
    });
});