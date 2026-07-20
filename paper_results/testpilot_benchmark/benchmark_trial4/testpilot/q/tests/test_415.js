let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.race - works with already resolved promises', function(done) {
        let resolvedPromise = q.resolve('immediate');
        let deferred = q.defer();
        
        q.race([resolvedPromise, deferred.promise]).then(function(result) {
            assert.strictEqual(result, 'immediate');
            done();
        }).catch(done);
        
        // This should not affect the result since resolvedPromise is already resolved
        setTimeout(() => deferred.resolve('delayed'), 10);
    });
});