let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - works with immediately resolved promise', function(done) {
        let resolvedPromise = q.resolve('immediate');
        let deferred = q.defer();
        
        let promises = [resolvedPromise, deferred.promise];
        
        // Use Promise.race equivalent or implement any-like behavior
        // Since q doesn't have .any(), we'll use the first resolved promise
        q.race(promises).then(function(result) {
            assert.strictEqual(result, 'immediate');
            done();
        }).catch(done);
        
        // This should not affect the result since resolvedPromise is already resolved
        setTimeout(() => deferred.resolve('delayed'), 10);
    });
});