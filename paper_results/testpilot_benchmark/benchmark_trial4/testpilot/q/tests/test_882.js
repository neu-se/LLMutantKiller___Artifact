let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.race - resolves immediately with already resolved promise', function(done) {
        let resolvedPromise = q.resolve('immediate');
        let deferred = q.defer();
        
        let promises = [resolvedPromise, deferred.promise];
        
        q.race(promises).then(function(result) {
            assert.equal(result, 'immediate');
            done();
        }).catch(done);
        
        // This should not affect the result since resolvedPromise is already resolved
        setTimeout(() => deferred.resolve('delayed'), 10);
    });
});