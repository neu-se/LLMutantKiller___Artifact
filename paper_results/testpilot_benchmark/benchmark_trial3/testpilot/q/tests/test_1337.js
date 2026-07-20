let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenResolve with delayed promise', function(done) {
        let deferred = q.defer();
        let newValue = 42;
        
        let resultPromise = q.thenResolve(deferred.promise, newValue);
        
        // Resolve the original promise after a short delay
        setTimeout(function() {
            deferred.resolve('original value');
        }, 10);
        
        resultPromise
            .then(function(result) {
                assert.strictEqual(result, newValue);
                done();
            })
            .catch(done);
    });
});