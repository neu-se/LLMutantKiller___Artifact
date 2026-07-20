let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - waits for original promise to resolve', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let resolvedValue = 'delayed value';
        let chainedPromise = promise.thenResolve(resolvedValue);
        let resolved = false;
        
        chainedPromise.then(function(value) {
            assert.strictEqual(value, resolvedValue);
            assert.strictEqual(resolved, true, 'Should wait for original promise');
            done();
        }).catch(done);
        
        // Delay the resolution to test timing
        setTimeout(function() {
            resolved = true;
            deferred.resolve();
        }, 10);
    });
});