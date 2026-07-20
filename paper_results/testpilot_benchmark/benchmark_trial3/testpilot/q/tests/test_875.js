let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q promise any-like behavior - resolves with first fulfilled promise', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        let deferred3 = q.defer();
        
        // Create an array of promises and use q.any() or implement any-like behavior
        let promises = [deferred1.promise, deferred2.promise, deferred3.promise];
        
        // Since q doesn't have .any(), we'll implement similar behavior
        // We'll use q.allSettled() and find the first fulfilled one
        let anyPromise = q.allSettled(promises).then(function(results) {
            for (let result of results) {
                if (result.state === 'fulfilled') {
                    return result.value;
                }
            }
            throw new Error('All promises rejected');
        });
        
        anyPromise.then(function(result) {
            assert.equal(result, 'second');
            done();
        }).catch(done);
        
        // Reject first, fulfill second, third pending
        setTimeout(() => deferred1.reject(new Error('first failed')), 10);
        setTimeout(() => deferred2.resolve('second'), 20);
        setTimeout(() => deferred3.resolve('third'), 30);
    });
});